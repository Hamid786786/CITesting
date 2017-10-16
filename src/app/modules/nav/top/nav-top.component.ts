/**
 *  Top navigation bar. After logging in, the profile tab, role change
 *  and search bar is shown.
 *
 *  ISSUES:
 *  - Behaviour of elements in small viewports
 */

import { Component, OnInit, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavService, AuthService, GlobalService } from '@pl-core/_services';
import { ISelectItem } from '@pl-core/_interfaces';
import { User } from '@pl-core/_models';
import { Router } from '@angular/router';
import { MdDialog, MdMenuTrigger } from '@angular/material';
import { GLOBAL, CONFIG } from '@pl-core/_config';
import { ClickOutside } from '@pl-core/_directives/click-outside';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '@pl-core/_services/login/login.service';
import {MetaService} from '@pl-core/_services/utils/meta.service';
import {RESOLUTION} from '@pl-core/_config/constants';
@Component({
  selector: 'pl-top-nav',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss'],
  encapsulation : ViewEncapsulation.None
})

export class TopNavComponent implements OnInit {
  @ViewChild(MdMenuTrigger) public trigger: MdMenuTrigger;
  @Output() public menuToggleEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() public profileToggleEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() public settingMenuToggleEmitter: EventEmitter<any> = new EventEmitter<any>();

  public currentUser: User;
  public logoAlt: string;
  public logoUrl: string = '';
  public highlighticon: boolean = false;
  public roleForm: FormGroup;
  public locationForm: FormGroup;
  public isAutherized: boolean;
  public module: string;
  public isMobile: boolean = true;
  public form: any;
  public active: boolean = false;
  public searchUrl: string = CONFIG.urls.globalSearch;

  constructor(private _authService: AuthService,
              private _loginService: LoginService,
              private _metaService: MetaService,
              private _fb: FormBuilder,
              public _router: Router,
              public dialog: MdDialog) {
  }

  public ngOnInit() {
    if (window.screen.width < RESOLUTION.LARGE) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    const $resizeEvent = Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .debounceTime(200);

    $resizeEvent.subscribe((data) => {
      if (data < RESOLUTION.LARGE) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    let tenantId = this._authService.getTenantID();
    this._loginService.getResources( tenantId )
      .subscribe((_res) => {
        if (_res[0]) {
          this.logoUrl = _res[0].logoURL;
          this.logoAlt = _res[0].logoALT;
          this._metaService.setTitle(_res[0].title);
          this._metaService.setFavicon(_res[0].favicon);
        }
      });
    this.currentUser = this._authService.currentUser();
    if (this.currentUser) {
      this.buildForm();
    }
  }

  public redirectSearch(emitData) {
    let type = emitData.moduleName;
    let data = emitData.data;

    if (type === 'mail' || type === 'chat' || type === 'task') {
      this._router.navigate(['communication/inbox/' + data.recordNumber]);
    } else if (type === 'appointment') {
      this._router.navigate(['communication/appointment/' + data.recordNumber]);
    } else {
      this._router.navigate(['dyn-module-summary/' + data.moduleId + '/' + data.recordNumber]);
    }
  }

   public iconAnimationCallback(evt) {
    this.highlighticon = evt.highlighticon;
  }

  public toggleSidebar(): void {
    this.menuToggleEmitter.emit();
  }

  public onOver(): void {
    // console.log('onover called');
  }

  public toggleProfile(): void {
    this.profileToggleEmitter.emit();
  }

  public toggleSettingMenu(): void {
    this.settingMenuToggleEmitter.emit();
  }

   public changeRole() {
    this._authService.setCurrentRole(this.roleForm.value.role);
  }

  public changeLocation() {
    this._authService.setCurrentLocation(this.locationForm.value.location);
  }
  public stopClickPropagate(event: any) {
    event.stopPropagation();
  }
  private buildForm(): void {

    this.roleForm = this._fb.group({
      role: ['', Validators.required]
    });
    if (this.currentUser.locations && this.currentUser.locations.length > 0) {
      this.locationForm = this._fb.group({
        location: ['', Validators.required]
      });
    }

  }

}

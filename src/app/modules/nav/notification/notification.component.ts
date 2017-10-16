import { Observable } from 'rxjs/Observable';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../core/_services/auth/auth.service';
import {User} from '../../../core/_models/user';
import {Router} from '@angular/router';
import {MdMenuTrigger, MdSnackBar} from '@angular/material';
import {RESOLUTION, GLOBAL} from '@pl-core/_config/constants';
import {find} from 'lodash';
import { TranslateService, NotificationService } from '@pl-core/_services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public interval;
  public showNotificationMenu: boolean = false;
  public isMobile: boolean = true;
  public currentUser: User;
  public userRoleDetail: any;
  public isAutherized: boolean;
  public notificationPopupEnable: boolean = false;
  public notify: any;
  public notificationCount = '';
  public notificationMessage;
  public audio;

  constructor(private _authService: AuthService, private _route: Router,
              public translateService: TranslateService,
              private snackBar: MdSnackBar,
              private notificationService: NotificationService) {
                this.audio = new Audio();
                this.audio.src = GLOBAL.constants.NOTIFICATION_SOUND;
              }

  public ngOnInit() {
    // Added for bubble count
    this.notificationService.subscribeNotification((message) => {
      this.notificationMessage = message;
      this.audio.load();
      this.audio.play();
      this.notificationCount = message.length > GLOBAL.constants.MAX_NOTIFICATION_COUNT ? GLOBAL.constants.MAX_NOTIFICATION_EXCEED : message.length ;
    });
    // bubble count ends here

    this.currentUser = this._authService.currentUser();
    if (window.screen.width <= RESOLUTION.LARGE) {
    this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public showNotification(): void {
    this.closeMenu();

    // TODO: reset bubble count on opening popup
    clearInterval(this.notificationService.interval);
    this.notificationCount = '';

    this.currentUser = this._authService.currentUser();
    if (this.currentUser.roles.length > 1) {
      this.userRoleDetail = find(this.currentUser.roles, { value: this.currentUser.currentRole });
      this.isAutherized = this.userRoleDetail.isAutherized;
      if (this.userRoleDetail.isAutherized) {
        this._route.navigate(['/communication']);
      } else {
         this.snackBar.open(this.translateService.instant('Unauthorized User') , this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['error']
        });
         this._route.navigate(['/dashboard']);
      }
    } else if (this.currentUser.roles.length === 1) {
      if (this.currentUser.roles[0].isAutherized) {
             this._route.navigate(['/communication']);
      } else {
         this.snackBar.open(this.translateService.instant('Unauthorized User'), this.translateService.instant('close'), {
          duration: GLOBAL.constants.DURATION,
          extraClasses: ['error']
        });
         this._route.navigate(['/dashboard']);
      }
    }

  }

  public closeMenu() {
    this.showNotificationMenu = false;
  }
  public openMenu() {
    this.showNotificationMenu = true;
  }
}

/**
 *  Side navigation bar that only shows once authenticated.
 *  Fetches list of modules to display and delegates to LeftNavItemGroup.
 *
 *  ISSUES:
 *  - Hover label is rendered as an absolutely positioned element where
 *    its CSS 'top' property is calculated dynamically in onMouseOver().
 *
 */

import {
  Component, OnInit, Renderer, ElementRef,
  ViewChild, trigger, state, style, animate,
  transition, AfterViewInit, ViewEncapsulation
} from '@angular/core';
import {NavService , AuthService} from '@pl-core/_services';
import {Router , ActivatedRoute} from '@angular/router';
import {ISidebarItem} from '@pl-core/_interfaces';
import {find} from 'lodash';

@Component({
  selector: 'pl-left-nav',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
  animations: [
    trigger('expandedLabel', [
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      state('*', style({
        transform: 'translateX(0%)'
      })),
      transition('void <=> *', [
        animate('200ms ease-out')
      ])
    ])
  ],
  encapsulation : ViewEncapsulation.None
})
// Menu items that navigate (route) to modules

export class LeftNavComponent implements OnInit, AfterViewInit {

  public isExpanded: boolean = false;

  public _roleChangeSub;
  public currentRole;
  public currentUserDetail;
  public currentRolesAccess;
  public initialRole;
  public currentRolesList: ISidebarItem[];
  public expandSubMenu: boolean;
  public path: any;
  public hoveredItem: ISidebarItem;
  public activeItem: ISidebarItem; // only used for non-routed items
  public modules: ISidebarItem[];

  // Other items anchored to the viewport's bottom
  public items: ISidebarItem[];

  @ViewChild('hoverLabel') public hoverLabelEl: ElementRef;
  private _hoverLabelEl: HTMLElement;

  private defaultModules: ISidebarItem[] = [
    {routerUrl: '/dashboard', label: 'Dashboard', icon: 'icofont-dashboard'}
  ];

  private fixedItems: ISidebarItem[] = [
    {label: 'Reports', icon: 'icofont-growth'},
    {label: 'Notifications', icon: 'icofont-notification', badgeNum: 2},
    {label: 'Help', icon: 'icofont-info-circle'}
  ];

  constructor(private _renderer: Renderer,
              private _authService: AuthService,
              private _routes: ActivatedRoute) {}
  public ngOnInit() {

    this.expandSubMenu = false;
    let that = this;
    let rolesList;

    this.path = this._routes.routeConfig.path;
    this.currentUserDetail = this._authService.currentUser();
    this.initialRole = this.currentUserDetail;
    that.currentRole = this.initialRole.currentRole;
    this.currentRolesAccess = find(that.initialRole.roles, {value: this.initialRole.currentRole});
    this.currentRolesList = this.currentRolesAccess.action;

    that._roleChangeSub = this._authService.roleChangeEventEmitter.subscribe((role) => {
      that.currentRole = role;
      that.currentUserDetail = this._authService.currentUser();
      that.currentRolesAccess = find(that.currentUserDetail.roles, {value: that.currentRole});
      that.currentRolesList = that.currentRolesAccess.action;
    });
    // Subscriber Event that will occur on change of location
    let fetchedModules: ISidebarItem[] = [
      {routerUrl: '/task-list', label: 'Task List', icon: 'icofont-list'},
      {routerUrl: '/dashboard/create/1234', label: 'Create Module', icon: 'icofont-pencil'},
      {routerUrl: '/dashboard/change/1234/12', label: 'Change Module', icon: 'icofont-hammer'},
      {routerUrl: '/dashboard/summary/1234/12', label: 'Summary Module', icon: 'icofont-list'},
      {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'}

    ];

    this.modules = [...this.defaultModules, ...fetchedModules];
    this.items = this.fixedItems;

  }

  public toggleExpansion(module) {
    if (module) {
      if (module.subRole.length > 0 && !this.isExpanded) {
        this.isExpanded = !this.isExpanded;
        this.expandSubMenu = true;
        if (!this.isExpanded) {
          this.expandSubMenu = false;
        }
      } else if (this.isExpanded && module.subRole.length > 0) {
        this.expandSubMenu = !this.expandSubMenu;
      }else {
        this.closeMenu();
      }
    } else {
      this.isExpanded = !this.isExpanded;
      if (!this.isExpanded) {
        this.expandSubMenu = false;
      }
    }
  }

  public handleClick(event) {
    event.stopPropagation();
    this.closeMenu();
  }
  public closeMenu() {
    this.hoveredItem = null;
    this.isExpanded = false;
  }
  public ngAfterViewInit() {
    this._hoverLabelEl = this.hoverLabelEl.nativeElement;
  }

  public onSelect(item: ISidebarItem) {
    this.activeItem = item;
  }

  public onMouseEnter(item: ISidebarItem, el: HTMLElement): void {
    this.hoveredItem = item;

    // Hacky! - hover label element's parent is offset by a height
    // of 60px by the top navbar
    let labelTop: string = (el.getBoundingClientRect().top - 60) + 'px';
    this._renderer.setElementStyle(this._hoverLabelEl, 'top', labelTop);
  }

  public onMouseLeave(): void {
    this.hoveredItem = null;
  }

}

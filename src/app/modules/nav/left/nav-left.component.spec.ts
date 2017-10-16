import { routes } from './../../home/home-routing.module';
import { ActivatedRoute } from '@angular/router';
import {ComponentFixture, TestBed, async, fakeAsync, tick, inject, TestComponentRenderer} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import {HttpModule, Http, BaseRequestOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {ISidebarItem} from '../../../core/_interfaces';
import {NavService, AuthService, LoginService, ExceptionService} from '../../../core/_services';
// stub for http is required

import {LeftNavComponent} from './nav-left.component';
import {CoreModule} from '../../../core/core.module';

// --- Declarations and helpers ---
let comp: LeftNavComponent;
let fixture: ComponentFixture<LeftNavComponent>;
let de: DebugElement;
let page: Page;
let authService: AuthService;
// stub NavService for future use, either use this
// or use a MockResponse
class NavServiceSpy {
  public getMenus = jasmine.createSpy('getMenus').and.callFake(() => {
    return {
      menus: [
        {routerUrl: '/task-list', label: 'Task List', icon: 'icofont-list'},
        {routerUrl: '/dashboard/create/1234', label: 'Create Module', icon: 'icofont-pencil'},
        {routerUrl: '/dashboard/change/1234/12', label: 'Change Module', icon: 'icofont-hammer'},
        {routerUrl: '/dashboard/summary/1234/12', label: 'Summary Module', icon: 'icofont-list'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'},
        {routerUrl: '/timesheet', label: 'Time Sheet', icon: 'icofont-time'}
      ]
    };
  });
}

let currentuser = {
  username: 'donald.trump',
  email: 'd.trump@potus.gov.us',
  fname: 'Donald',
  lname: 'Trump',
  currentRole: 'CSA',
  roles: [{label: 'Clown in a Suit', value: 'CSA'}],
  currentLocation: '',
  locations: [],
  timeZone: 'A World of His Own',
  profilePicSno: '',
  numberFormat: '',
  token: '7687286-HFG'
};
class AuthServiceSpy {
  public roleChangeEventEmitter = new EventEmitter<any>; 
  public currentUser = jasmine.createSpy('currentUser').and.returnValue(currentuser);
};

class TranslateServiceStub {
  public instant = jasmine.createSpy('instant');
}


class ActivatedRouteStub {
  public routeConfig= {
      path: ''
  };
  constructor() {
    console.log(this.routeConfig);
    this.routeConfig.path = 'nav';
  }
}

class Page {
  public wrapper;
  public moduleList;
  public itemList;
  public moduleLabel;
  public hoveredLabelContainer;
  public hoveredLabel;
  public itemBadge;

  public constructor() {
    this.wrapper = de.query(By.css('.sidebar-wrapper'));
    this.moduleList = de.query(By.css('.sidebar-items.shrink-to-scroll'));
    this.itemList = de.query(By.css('.sidebar-items:not(.shrink-to-scroll)'));
    this.hoveredLabelContainer = de.query(By.css('.hover-label-container'));
    this.hoveredLabel = de.query(By.css('.hover-label'));
    this.itemBadge = de.queryAll(By.css('.item-badge'));
    this.moduleLabel = de.queryAll(By.css('.expanded-label'));
  }

  public updateItemList() {
    this.itemList = de.query(By.css('.sidebar-items'));
  }

  public updateModuleList() {
    this.moduleList = de.query(By.css('.sidebar-items.shrink-to-scroll'));
  }

  public updateHoveredLabel() {
    this.hoveredLabel = de.query(By.css('.hover-label'));
  }

  public updateModuleLabel() {
    this.moduleLabel = de.queryAll(By.css('.expanded-label'));
  }

  public updateItemBadge() {
    this.itemBadge = de.queryAll(By.css('.item-badge'));
  }

}

function createComponent(): void {
  fixture = TestBed.createComponent(LeftNavComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
  page = new Page();

  // First change detection round triggers ngOnInit() and all
  // data/property/event bindings in the template

  // provide slides here when creating the component
  fixture.detectChanges();

}

describe('NavLeftComponent', () => {
  let ActivatedRouteMock;
  beforeEach(async(() => { 
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpModule],
      declarations: [LeftNavComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore psuedo elements except for angular defined ones such as ngFor and ngIf...
      providers: [
        NavService,
        {provide: AuthService, useClass: AuthServiceSpy},
        {provide: XHRBackend, useClass: MockBackend},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        ExceptionService,
        LoginService
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    ActivatedRouteMock = new ActivatedRouteStub();
    createComponent();
  //   // authService = de.injector.get(AuthService);
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  // it('Check handleClick() function', () => {
  //   console.log(ActivatedRouteMock._routes.routeConfig.path,'this._routes.routeConfig.path');
  //   comp.onMouseLeave();
  //   expect(comp.hoveredItem).toBeFalsy();

  // });

  // sanity check/ smoke test for the component
  xit('renders correctly', () => {
    expect(page.wrapper).toBeUndefined();
    expect(page.itemList).toBeDefined();
    expect(page.moduleList).toBeDefined();
    expect(page.hoveredLabelContainer).toBeDefined();
    expect(page.hoveredLabel).toBeNull();
  });

  xit('displays the modules', () => {
    // inject data and provide a mockresponse here
    const actual = page.moduleList.nativeElement.children.length;
    expect(actual).toBeGreaterThan(0);
  });

  // this is a public method on the component, although trivial it has to be tested
  xit('can expand and collapse when toggleExpanded is called', () => {
    comp.toggleExpansion(null);
    expect(comp.isExpanded).toEqual(true);
    comp.toggleExpansion(null);
    expect(comp.isExpanded).toEqual(false);
  });

  xit('displays labels of all the modules when expanded', () => {
    comp.isExpanded = true;
    fixture.detectChanges();
    page.updateModuleLabel();
    const actual = page.moduleLabel.length;
    expect(actual).toBeGreaterThan(0);
  });

  // BAD TESTS, depends on data pulled out from the
  // component's internal state, ensure that it depends on
  // mocked service output when doing this
  xit('sets an item as the active item when it is clicked', async(() => {
    spyOn(comp, 'onSelect').and.callThrough();
    const expected = {label: 'Reports', icon: 'icofont-growth'};
    const targetElement = page.itemList.nativeElement.children[0];
    targetElement.click();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(comp.onSelect).toHaveBeenCalled();
        expect(comp.onSelect).toHaveBeenCalledWith(expected);
        expect(comp.activeItem).toEqual(expected);
      });

  }));

  xit('when not expanded, displays a tooltip when a module is hovered', async(() => {
    spyOn(comp, 'onMouseEnter').and.callThrough();
    const expected = {routerUrl: '/dashboard', label: 'Dashboard', icon: 'icofont-dashboard'};
    // need to get to the anchor element inside the module li
    const targetElement = page.moduleList.nativeElement.children[0].children[0];
    // targetElement.mouseenter(); does not work, it throws an error
    // refer http://stackoverflow.com/questions/38069249/angular2-testing-with-jasmine-mouseenter-mouseleave-test
    targetElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(comp.onMouseEnter).toHaveBeenCalled();
        // expect(comp.onMouseEnter).toHaveBeenCalledWith(expected, targetElement);
        expect(comp.hoveredItem).toEqual(expected);
      });
  }));

  // TEST string uses words like user, changes and make simpler
  xit('when not expanded, hides the tooltip user stops hovering on the module', () => {
    spyOn(comp, 'onMouseEnter');
    spyOn(comp, 'onMouseLeave');
    const targetElement = page.moduleList.nativeElement.children[0].children[0];
    targetElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    targetElement.dispatchEvent(new Event('mouseleave'));
    fixture.whenStable()
      .then(() => {
        expect(comp.onMouseEnter).toHaveBeenCalled();
        expect(comp.onMouseLeave).toHaveBeenCalled();
        expect(comp.hoveredItem).not.toBeDefined();
      });
  });
});
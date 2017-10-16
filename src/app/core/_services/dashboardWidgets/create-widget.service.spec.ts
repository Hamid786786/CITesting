import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {CreateWidgetService} from './create-widget.service';
import {AuthService} from '@pl-core/_services/auth/auth.service';
import {Observable} from 'rxjs/Observable';

class AuthServiceStub {
  public roleChangeObservable$ = Observable.of({});
  private user = {
    id: 104,
    username: 'ravi',
    password: 'ravi',
    status: 200,
    email: 'Ravi.saikia@prospecta.com',
    fname: 'Ravi',
    lname: '',
    currentRole: 'AD',
    emailSignature: '<p><strong><em>Prospects Email Signature</em></strong></p><p><u>Web Project</u></p><p><br></p><h1>hello I am Prospecta</h1>',
    digitalSignature: '',
    agmKey: 'AIzaSyDSdo5E3T9YIx0ERdHP6Cn8VY8jfn3Zbkc',
    roles: [
      {
        label: 'Administrator',
        value: 'AD',
        isAutherized: true,
        action: [
          {
            routerUrl: '/dashboard',
            label: 'Dashboard',
            icon: 'icofont-dashboard',
            rollId: 'rol-1',
            subRole: []
          },
          {
            routerUrl: '/create/1234',
            label: 'Task List',
            icon: 'icofont-pencil',
            rollId: 'rol-2',
            subRole: []
          },
          {
            routerUrl: '/change/1234/12',
            label: 'Change Module',
            icon: 'icofont-hammer',
            rollId: 'rol-3',
            subRole: []
          },
          {
            routerUrl: '/summary/1234/12',
            label: 'Summary Module',
            icon: 'icofont-list',
            rollId: 'rol-4',
            subRole: []
          },
          {
            routerUrl: '/timesheet',
            label: 'Time Sheet',
            icon: 'icofont-time',
            rollId: 'rol-5',
            subRole: []
          },
          {
            routerUrl: '/module/list/1',
            label: 'Equipment',
            icon: 'icofont icofont-tools-alt-2',
            rollId: 'rol-6',
            subRole: []
          },
          {
            routerUrl: '/module/list/2',
            label: 'Product',
            icon: 'icofont icofont-tools-alt-2',
            rollId: 'rol-7',
            subRole: []
          }
        ],
        widgets: [
          {
            id: -1,
            type: 'create-widget',
            title: '',
            w: 1,
            h: 1,
            content: {},
            dragAndDrop: false,
            resizable: false
          },
          {
            id: 5,
            type: 'inbox',
            title: '',
            w: 2,
            h: 2,
            x: 0,
            y: 0,
            dragAndDrop: false,
            resizable: false,
            content: {},
            xLg: 2,
            xXl: 2,
            yXl: 0,
            xSm: 0,
            ySm: 0,
            xMd: 1,
            yMd: 0,
            yLg: 0
          },
          {
            id: 2,
            type: 'iframe',
            title: 'Prospecta',
            w: 1,
            h: 1,
            x: 0,
            y: 1,
            dragAndDrop: true,
            resizable: true,
            content: {
              url: 'https://www.prospecta.com/mdo-solution.html'
            },
            yLg: 1,
            xLg: 0
          },
          {
            id: 1,
            type: 'iframe',
            title: 'Connekthub',
            w: 1,
            h: 2,
            x: 0,
            y: 0,
            dragAndDrop: true,
            resizable: true,
            content: {
              url: 'https://www.connekthub.com/'
            },
            xLg: 1,
            yLg: 0
          },
          {
            id: 15,
            type: 'video',
            title: 'Sample Video',
            w: 1,
            h: 1,
            dragAndDrop: true,
            resizable: true,
            content: {
              src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
            },
            yLg: 2,
            xLg: 0
          }
        ]
      },
      {
        label: 'Employee',
        value: 'EMP',
        isAutherized: false,
        action: [
          {
            routerUrl: '/dashboard',
            label: 'Dashboard',
            icon: 'icofont-dashboard',
            rollId: 'rol-1',
            subRole: []
          },
          {
            routerUrl: '/create/1234',
            label: 'Task List',
            icon: 'icofont-pencil',
            rollId: 'rol-2',
            subRole: []
          },
          {
            routerUrl: '/module/list/1',
            label: 'Equipment',
            icon: 'icofont icofont-tools-alt-2',
            rollId: 'rol-6',
            subRole: []
          },
          {
            routerUrl: '/summary/1234/12',
            label: 'Summary Module',
            icon: 'icofont-list',
            rollId: 'rol-4',
            subRole: [
              {
                routerUrl: '/summary/1234/10',
                label: 'Summary Sub-1 Module',
                icon: 'icofont-list',
                subrollId: 'rol-1'
              },
              {
                routerUrl: '/summary/1234/08',
                label: 'Summary Sub-2 Module',
                icon: 'icofont-list',
                subrollId: 'rol-2'
              }
            ]
          }
        ],
        widgets: [
          {
            id: -1,
            type: 'create-widget',
            title: '',
            w: 1,
            h: 1,
            content: {},
            dragAndDrop: false,
            resizable: false
          },
          {
            id: 3,
            type: 'carousel',
            title: 'Carousel',
            w: 1,
            h: 1,
            x: 1,
            y: 0,
            dragAndDrop: true,
            resizable: true,
            content: {
              slides: [
                {
                  description: 'Dummy 1',
                  url: 'assets/img/carousel1.jpg',
                  state: 'current'
                },
                {
                  description: 'Dummy 2',
                  url: 'assets/img/carousel2.jpg',
                  state: 'right'
                },
                {
                  description: 'Dummy 3',
                  url: 'assets/img/carousel3.jpg',
                  state: 'right'
                }
              ]
            }
          },
          {
            id: 2,
            type: 'iframe',
            title: 'Prospecta',
            w: 1,
            h: 1,
            x: 0,
            y: 1,
            dragAndDrop: true,
            resizable: true,
            content: {
              url: 'https://www.prospecta.com/mdo-solution.html'
            }
          },
          {
            id: 1,
            type: 'iframe',
            title: 'Connekthub',
            w: 1,
            h: 1,
            x: 0,
            y: 0,
            dragAndDrop: true,
            resizable: true,
            content: {
              url: 'https://www.connekthub.com/'
            }
          },
          {
            id: 3,
            type: 'carousel',
            title: 'Carousel',
            w: 1,
            h: 1,
            x: 1,
            y: 0,
            dragAndDrop: true,
            resizable: true,
            content: {
              slides: [
                {
                  description: 'Dummy 1',
                  url: 'assets/img/carousel1.jpg',
                  state: 'current'
                },
                {
                  description: 'Dummy 2',
                  url: 'assets/img/carousel2.jpg',
                  state: 'right'
                },
                {
                  description: 'Dummy 3',
                  url: 'assets/img/carousel3.jpg',
                  state: 'right'
                }
              ]
            }
          },
          {
            id: 2,
            type: 'iframe',
            title: 'Prospecta',
            w: 1,
            h: 1,
            x: 0,
            y: 1,
            dragAndDrop: true,
            resizable: true,
            content: {
              url: 'https://www.prospecta.com/mdo-solution.html'
            }
          }
        ]
      }
    ],
    currentLocation: 'SYD',
    locations: [
      {
        label: 'Sydney',
        value: 'SYD',
        action: [
          {
            routerUrl: '/dashboard',
            label: 'Dashboard',
            icon: 'icofont-dashboard',
            rollId: 'rol-1',
            subRole: []
          },
          {
            routerUrl: '/task-list',
            label: 'Task List',
            icon: 'icofont-pencil',
            rollId: 'rol-2',
            subRole: []
          },
          {
            routerUrl: '/change/1234/12',
            label: 'Change Module',
            icon: 'icofont-hammer',
            rollId: 'rol-3',
            subRole: []
          },
          {
            routerUrl: '/summary/1234/12',
            label: 'Summary Module',
            icon: 'icofont-list',
            rollId: 'rol-4',
            subRole: []
          }
        ]
      }
    ],
    timeZone: 'AEST',
    profilePicSno: '',
    dateFormat: 'MM.dd.yy',
    numberFormat: '0.00',
    token: 'A6927-672398AFG-FHG5623',
    tenantId: 'PC102'
  };
  public currentUser() {
    return this.user;
  }
  public updateUserProfile( id, userObj) {
    if (this.user.id === id) {
      this.user = userObj;
    }
    return Observable.of(this.user);
  }
}
describe('CreateWidgetService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CreateWidgetService, {provide: AuthService, useClass: AuthServiceStub}]
    });
  });
  it('CreateWidgetService should be created', inject([CreateWidgetService], (service: CreateWidgetService) => {
    expect(service).toBeTruthy();
  }));
  it('Should get widgets for currentRole of user', inject([CreateWidgetService, AuthService], (service: CreateWidgetService, _auth: AuthService) => {
    let widgets = service.getWidgetsForCurrentRole();
    expect(widgets.length).toEqual(_auth.currentUser().roles[0].widgets.length);
    expect(widgets[1]).toEqual(_auth.currentUser().roles[0].widgets[1]);
  }));
  it('Should delete a widget from the users currentrole widgets', inject([CreateWidgetService, AuthService], (service: CreateWidgetService, _auth: AuthService) => {
    let widgetToDelete = {
      id: 2,
      type: 'iframe',
      title: 'Prospecta',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      dragAndDrop: true,
      resizable: true,
      content: {
        url: 'https://www.prospecta.com/mdo-solution.html'
      },
      yLg: 1,
      xLg: 0
    };
    service.deleteCurrentWidget(widgetToDelete);
    let widgets = service.getWidgetsForCurrentRole();
    expect(widgets.length).toEqual(4);
    // expect(widgets).not.toContain(widgetToDelete);
  }));
  it('Should update widgets from the users currentrole widgets', inject([CreateWidgetService, AuthService], (service: CreateWidgetService, _auth: AuthService) => {
    let widgets = service.getWidgetsForCurrentRole();
    widgets[1].w = 2;
    widgets[1].h = 2;
    service.updateCurrentWidget(widgets);
    expect(widgets.length).toEqual(_auth.currentUser().roles[0].widgets.length);
    expect(widgets[1]).toEqual(_auth.currentUser().roles[0].widgets[1]);
  }));
  it('Should add a widget to the users current role widgets', inject([CreateWidgetService, AuthService], (service: CreateWidgetService, _auth: AuthService) => {
    let widgetIdToAdd = 3 ;
    let widgetToAdd = {
      id: 3,
      type: 'iframe',
      title: 'Prospecta',
      w: 1,
      h: 1,
      x: 0,
      y: 1,
      dragAndDrop: true,
      resizable: true,
      content: {
        url: 'https://www.dummy.com'
      },
      yLg: 1,
      xLg: 0
    };
    function addNewWidget(widgetId) {
      if (widgetToAdd.id === widgetId) {
        _auth.currentUser().roles[0].widgets.push(widgetToAdd);
      }
    }
    let widgets = service.getWidgetsForCurrentRole();
    spyOn(service, 'addWidget').and.callFake(addNewWidget);
    service.addWidget(widgetIdToAdd);
    expect(widgets.length).toEqual(6);
  }));

});

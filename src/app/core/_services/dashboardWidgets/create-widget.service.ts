import {Injectable, EventEmitter, Output, Inject, OnInit} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {User} from '@pl-core/_models';
import {CONFIG} from '@pl-core/_config';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {findIndex} from 'lodash';
import {AuthService} from '@pl-core/_services/auth/auth.service';
import {GLOBAL} from '@pl-core/_config';

@Injectable()
export class CreateWidgetService {
    public getWidgets$: Observable<any>;
    private widgets;
    private widgetSubject: Subject<boolean>;
    private isDragging = false;

    constructor(private _http: Http,
                private _auth: AuthService) {
        this.widgetSubject = new Subject<boolean>();
        this.getWidgets$ = this.widgetSubject.asObservable();
        _auth.roleChangeObservable$.subscribe((flag1) => {
            this.updateWidgets();
        });
        this.updateWidgets();
    }

    public updateWidgets() {
        this.widgets = this.getWidgetsForCurrentRole();
        this.UpdateWidgetsUI(this.widgets);
    }

    public getCreateWidgetJSON() {
        return {
            id: -1,
            type: 'create-widget',
            title: '',
            w: 1,
            h: 1,
            content: {},
            dragAndDrop: false,
            resizable: false
        };
    }

    public addWidget(widgetId) {
        this.getWidgetById(widgetId).subscribe(
            (newWidgetToAdd) => {
                let user = this._auth.currentUser();
                this.widgets = this.getWidgetsForCurrentRole();
                this.removeCreateWidget();
                this.widgets.push(newWidgetToAdd);
                this.addCreateWidget();
                this.updateCurrentWidget(this.widgets);
            }
        );
    }

    public updateCurrentWidget(widgets) {
        let user = this._auth.currentUser();
        for (let role of user.roles) {
            if (role.value === user.currentRole) {
                role.widgets = widgets;
                break;
            }
        }
        this._auth.updateUserProfile(user.id, user).subscribe(
            (updatedUser) => {
                // updated UI
                this.UpdateWidgetsUI(widgets);
            }, (err) => {
                // console.log(err);
            });
    }

    public deleteCurrentWidget(widget) {
        let user = this._auth.currentUser();
        for (let role of user.roles) {
            if (role.value === user.currentRole) {
                // update widget here  role.widgets
                let id = findIndex(role.widgets, (col) => {
                    return (col['id'] === widget.id);
                });
                this.removeCreateWidget();
                role.widgets.splice(id, 1);
                this.addCreateWidget();
                break;
            }
        }
        this._auth.updateUserProfile(user.id, user).subscribe(
            (updatedUser) => {
                this.updateWidgets();
            }, (err) => {
                // console.log(err);
            });
    }

    public getWidgetById(id) {
        return this._http.get(CONFIG.urls.dashboardresources + '/' + id)
            .map((response: Response) => {
                let widget: any = response.json();
                return widget;
            });
    }
    public getWidgetsForCurrentRole() {
        let user = this._auth.currentUser();
        for (let role of user.roles) {
            if (role.value === user.currentRole) {
                return role.widgets;
            }
        }
    }

    private UpdateWidgetsUI(_widgets) {
        this.widgetSubject.next(_widgets);
    }

    private getCreateWidgetIndex() {
        let index = findIndex(this.widgets, ['type', 'create-widget']);
        return index;
    }

    private removeCreateWidget() {
        this.widgets.splice(this.getCreateWidgetIndex(), 1);
    }

    private addCreateWidget() {
        this.widgets.push(this.getCreateWidgetJSON());
    }

    private widgetRealigned() {
        // TODO: Enable this section if UI has to be updated after realign
        /*if(this.isDragging == false)
         {
         setTimeout(() => {
         this.removeCreateWidget();
         this.UpdateWidgetsUI(this.widgets);
         this.addCreateWidget();
         this.UpdateWidgetsUI(this.widgets);
         this.isDragging = false;
         }, 1500);

         this.isDragging = true;
         }*/
    }
}

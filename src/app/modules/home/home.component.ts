import {Component, OnInit} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {TitleCasePipe} from '@pl-core/_pipes/';
import {MdSnackBar} from '@angular/material';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '@pl-core/_services/auth/auth.service';
import {PaletteConfiguratorService} from '@pl-core/_services/palette/palette-configurator.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public _urls = [];
    public _routerSubscription: any;
    public setting: any;

    constructor(public _router: Router,
                private titleService: Title,
                private paletteConfiguratorService: PaletteConfiguratorService) {
    }

    public ngOnInit() {
        // This is to fix the reload issue, breadcrumb was
        // console.log('localStorage.getItem(AuthService.CURRENT_TENANT_PRIMARY_COLOR', localStorage.getItem(AuthService.CURRENT_TENANT_PRIMARY_COLOR));
        if (localStorage.getItem(AuthService.CURRENT_TENANT_PRIMARY_COLOR)) {
            this.paletteConfiguratorService.processCSSVariables({
                'app-primary-color': localStorage.getItem(AuthService.CURRENT_TENANT_PRIMARY_COLOR),
            });
        }
        this._urls = this._router.url.split('/');
        let eventData;
        this._routerSubscription = this._router.events.subscribe((navigationEnd) => {
            setTimeout(() => {
                if (navigationEnd instanceof NavigationStart) {
                    this._urls.length = 0;
                    let routeData = navigationEnd.url.split('/');
                    this._urls = routeData;
                }
                let urlTitle = new TitleCasePipe().transform( this._urls[1]);
                this.titleService.setTitle(urlTitle);
            }, 0);
        });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

}

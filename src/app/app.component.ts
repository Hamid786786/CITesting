/**
 *  Top level component which includes navigation bar and main
 *  router outlet. Hides certain nav elements depending on whether
 *  user is authenticated.
 *
 *  ISSUES:
 *  - Mobile: menu items skip onto next line (see ::after/::before)
 *  -
 */

import {OnInit, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AppState} from '@pl/app.service';
import {AuthService, PaletteConfiguratorService, PaletteFetcherService} from '@pl-core/_services';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

    private _appPaletteSub: Subscription;
    private _tenantParamSub: Subscription;

    constructor(private _authService: AuthService,
                private _paletteFetcher: PaletteFetcherService,
                private _paletteConfigurator: PaletteConfiguratorService) {

        _authService.getTenantID$.subscribe((tId) => {
            if (tId) {
                this._authService.tenantIdForLogin = tId;

                this._appPaletteSub = this._paletteFetcher.getTenantPalette(tId).subscribe((palette) => {

                    this._paletteConfigurator.populateAppColors(palette);
                });
            } else { // default

                this._appPaletteSub = this._paletteFetcher.getApplicationPalette().subscribe((palette) => {

                    this._paletteConfigurator.populateAppColors(palette);
                });
            }
        });
    }

    public ngOnInit() {
        let loggedIn = this._authService.isAuthenticated();
        if (loggedIn) {
            this._authService.setTenantPalette();
        } else {
            let tenantId = this._authService.getTenantID();
            if (tenantId) {
                this._authService.tenantIdForLogin = tenantId;

                this._appPaletteSub = this._paletteFetcher.getTenantPalette(tenantId).subscribe((palette) => {
                    this._paletteConfigurator.populateAppColors(palette);
                });
            } else { // default

                this._appPaletteSub = this._paletteFetcher.getApplicationPalette().subscribe((palette) => {

                    this._paletteConfigurator.populateAppColors(palette);
                });
            }
        }
    }

    public ngOnDestroy() {
        this._tenantParamSub.unsubscribe();
        this._appPaletteSub.unsubscribe();
    }

}

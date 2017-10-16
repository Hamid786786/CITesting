/**
 *  Configures the global colour palette defined in src/styles/styles.scss
 *
 */

import {Injectable} from '@angular/core';
import {Palette} from '@pl-core/_models';
import {AuthService} from '../auth/auth.service';
@Injectable()
export class PaletteConfiguratorService {

  private originalStyles = new WeakMap();

  public populateAppColors(palette: Palette) {
    this.processCSSVariables({
      'app-primary-color': palette.primaryColor,
      'app-secondary-color': palette.secondaryColor,
      'app-tertiary-color': palette.tertiaryColor,
      'app-primary-bg-color': palette.primaryBGColor,
      'app-secondary-bg-color': palette.secondaryBGColor,
      'app-tertiary-bg-color': palette.tertiaryBGColor,
      'app-text-color': palette.textColor,
      'app-text-bg-color': palette.textBGColor,
      'app-text-secondary-bg-color': palette.textSecondaryBGColor
    });
    if (palette.primaryColor) {
      localStorage.setItem(AuthService.CURRENT_TENANT_PRIMARY_COLOR, palette.primaryColor);
    }

  }

  // Dynamic CSS3 variables are prefixed with two consecutive dashes, e.g.
  public processCSSVariables(input) {
    let styles = Array.prototype.slice.call(document.querySelectorAll('style'), 0);
    let defRE = /(\-\-[-\w]+)\:\s*(.*?)\;/g;
    let overwrites = input || {};

    if (nativeSupport()) {
      Object.keys(overwrites).forEach((property) => {
        document.body.style.setProperty('--' + property, overwrites[property]);
      });
      return;
    }

    function nativeSupport() {
      let bodyStyles = window.getComputedStyle(document.body);
      let fooBar = bodyStyles.getPropertyValue('--app-primary-color'); // any variable from CSS to test native compatibility
      return !!fooBar;
    }

    function refRE(name) {
      return (new RegExp('var\\(\s*' + name + '\s*\\)', 'gmi'));
    }

    styles.forEach((styleElement) => {
      let content = this.originalStyles[styleElement] || (this.originalStyles[styleElement] = styleElement.textContent);
      let vars;
      let uses;
      vars = defRE.exec(content);
      while (vars) { // while((vars = defRE.exec(content)))
        content = content.replace(refRE(vars[1]), overwrites[vars[1].substr(2)] || vars[2]);
      }

      styleElement.textContent = content;
    });
  }
}

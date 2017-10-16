import {Palette} from '@pl-core/_models';
import {PaletteConfiguratorService} from './palette-configurator.service';

let paletteService;

// check if CSS Variables are available, determines matching mechanism
function nativeSupport() {
    let bodyStyles = window.getComputedStyle(document.body);
    let fooBar = bodyStyles.getPropertyValue('--app-primary-color'); // any variable from CSS to test native compatibility
    return !!fooBar;
}

function generateMessage(colorName, actual, expected) {
    return `Actual ${colorName} color ${actual} did not match  expected ${expected} value`;
}

// currently just a function that accepts a palette and returns a boolean
// after logging a message, consider converting to a custom matcher for
// more power and terser syntax
function paletteMatcher(palette: Palette): boolean {
    let bodyStyles;
    let message = '';
    let result = true;


    // EXPECTED:
    const primaryColor = palette['primaryColor'];
    const secondaryColor = palette['secondaryColor'];
    const tertiaryColor = palette['tertiaryColor'];

    const primaryBgColor = palette['primaryBGColor'];
    const secondaryBgColor = palette['secondaryBGColor'];
    const tertiaryBgColor = palette['tertiaryBGColor'];

    const textColor = palette['textColor'];
    const textBgColor = palette['textBGColor'];
    const textSecondaryBgColor = palette['textSecondaryBGColor'];

    document.body.setAttribute('style', `
  --app-primary-color:rgba(64, 114, 147, 1); 
  --app-secondary-color:rgba(103, 167, 215, 1); 
  --app-tertiary-color:rgba(146, 199, 239, 1); 
  --app-primary-bg-color:rgba(245, 245, 245, 1); 
  --app-secondary-bg-color:rgba(250, 250, 250, 1); 
  --app-tertiary-bg-color:rgba(248, 248, 248, 1); 
  --app-text-color:rgba(255, 255, 255, 1); 
  --app-text-bg-color:rgba(0, 0, 0, 1); 
  --app-text-secondary-bg-color:rgba(170, 170, 170, 1);`);

    if (nativeSupport()) {
        bodyStyles = window.getComputedStyle(document.body);
    } else {
        // do something else
        bodyStyles = Array.prototype.slice.call(document.querySelectorAll('style'), 0);
    }

    // ACTUAL:
    const actualPrimaryColor = bodyStyles.getPropertyValue('--app-primary-color');
    const actualSecondaryColor = bodyStyles.getPropertyValue('--app-secondary-color');
    const actualTertiaryColor = bodyStyles.getPropertyValue('--app-tertiary-color');
    const actualPrimaryBgColor = bodyStyles.getPropertyValue('--app-primary-bg-color');
    const actualSecondaryBgColor = bodyStyles.getPropertyValue('--app-secondary-bg-color');
    const actualTertiaryBgColor = bodyStyles.getPropertyValue('--app-tertiary-bg-color');
    const actualTextColor = bodyStyles.getPropertyValue('--app-text-color');
    const actualTextBackgroundColor = bodyStyles.getPropertyValue('--app-text-bg-color');
    const actualTextSecondaryBgColor = bodyStyles.getPropertyValue('--app-text-secondary-bg-color');

    // show all errors with the palette, do not bail early, show messages for each mismatch
    // code can be moved into a seperate function
    if (actualPrimaryColor !== primaryColor) {
        message = generateMessage('primary', actualPrimaryColor, primaryColor);
        result = false;
    }

    if (actualSecondaryColor !== secondaryColor) {
        message = generateMessage('secondary', actualSecondaryColor, secondaryColor);
        result = false;
    }

    if (actualTertiaryColor !== tertiaryColor) {
        message = generateMessage('tertiary', actualTertiaryColor, tertiaryColor);
        result = false;
    }

    if (actualPrimaryBgColor !== primaryBgColor) {
        message = generateMessage('primary background', actualPrimaryBgColor, primaryBgColor);
        result = false;
    }

    if (actualSecondaryBgColor !== secondaryBgColor) {
        message = generateMessage('secondary background', actualSecondaryBgColor, secondaryBgColor);
        console.log(message);
        result = false;
    }

    if (actualTertiaryBgColor !== tertiaryBgColor) {
        message = generateMessage('tertiary background', actualTertiaryBgColor, tertiaryBgColor);
        result = false;
    }

    if (actualTextColor !== textColor) {
        message = generateMessage('text color', actualTextColor, textColor);
        result = false;
    }

    if (actualTextBackgroundColor !== textBgColor) {
        message = generateMessage('text background color', actualTextBackgroundColor, textBgColor);
        console.log(message);
        result = false;
    }

    if (actualTextSecondaryBgColor !== textSecondaryBgColor) {
        message = generateMessage('text secondary background color', actualTextBackgroundColor, textBgColor);
        result = false;
    }

    return result;
}

describe('PaletteConfiguratorService', () => {

    beforeEach(() => {
        paletteService = new PaletteConfiguratorService();
    });

    afterEach(() => {
        let appColors = {
            primaryColor: 'rgba(0, 137, 5, 1)',
            secondaryColor: 'rgba(66, 224, 72, 1)',
            tertiaryColor: 'rgba(101, 214, 116, 1)',
            primaryBGColor: 'rgba(245, 245, 245, 1)',
            secondaryBGColor: 'rgba(250, 250, 250, 1)',
            tertiaryBGColor: 'rgba(248, 248, 248, 1)',
            textColor: 'rgba(255, 255, 255, 1)',
            textBGColor: 'rgba(0, 0, 0, 1)',
            textSecondaryBGColor: 'rgba(170, 170, 170, 1)'
        };
        paletteService.populateAppColors(appColors);
    });

    it('accepts a palette and overrides the application styles', () => {
        let palette = {
            primaryColor: 'rgba(64, 114, 147, 1)',
            secondaryColor: 'rgba(103, 167, 215, 1)',
            tertiaryColor: 'rgba(146, 199, 239, 1)',
            primaryBGColor: 'rgba(245, 245, 245, 1)',
            secondaryBGColor: 'rgba(250, 250, 250, 1)',
            tertiaryBGColor: 'rgba(248, 248, 248, 1)',
            textColor: 'rgba(255, 255, 255, 1)',
            textBGColor: 'rgba(0, 0, 0, 1)',
            textSecondaryBGColor: 'rgba(170, 170, 170, 1)'
        };
        paletteService.populateAppColors(palette);
        const actual = paletteMatcher(palette);
        const expected = true;
        expect(actual).toEqual(expected);
    });
});

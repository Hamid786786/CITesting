import {Injectable, Inject} from '@angular/core';
import {TRANSLATIONS} from './translations';

@Injectable()
export class TranslateService {

  public static readonly CURRENT_LANG: string = 'currentLang';

  private defaultLang: string = 'en';

  get currentLang() {
    if (localStorage.getItem(TranslateService.CURRENT_LANG)) {
      return localStorage.getItem(TranslateService.CURRENT_LANG);
    }
    return this.defaultLang;
  }

  set currentLang(lang: string) {
    localStorage.setItem(TranslateService.CURRENT_LANG, lang);
  }

  // inject our translations
  constructor(@Inject(TRANSLATIONS) private _translations: any) {
  }

  public use(lang: string): void {
    // set current language
    localStorage.setItem(TranslateService.CURRENT_LANG, lang);
  }

  public instant(key: string) {
    // public perform translation
    return this.translate(key, this.currentLang);
  }

  public instantWithLang(key: string, lang: string) {
    // public perform translation with provided language
    return this.translate(key, lang);
  }

  private translate(key: string, lang: string): string {
    // private perform translation
    let translation = key;

    if (this._translations[lang] && this._translations[lang][key]) {
      return this._translations[lang][key];
    }

    return translation;
  }
}

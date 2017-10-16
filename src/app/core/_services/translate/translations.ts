// app/core/translate/translations.ts

import {InjectionToken} from '@angular/core';

// import translations
import * as   LANG_ES_TRANS from '../../../../assets/json_files/translations/lang-es.json';
import * as   LANG_ZH_TRANS from '../../../../assets/json_files/translations/lang-zh.json';
import * as   LANG_EN_TRANS from '../../../../assets/json_files/translations/lang-en.json';
// translation token
export const TRANSLATIONS = new InjectionToken<string>('translations');

// all translations
export const LANG_EN_NAME = 'en';
export const LANG_ES_NAME = 'es';
export const LANG_ZH_NAME = 'zh';

export const dictionary = {};
dictionary[LANG_EN_NAME] = LANG_EN_TRANS;
dictionary[LANG_ES_NAME] = LANG_ES_TRANS;
dictionary[LANG_ZH_NAME] = LANG_ZH_TRANS;

// providers
export const TRANSLATION_PROVIDERS = [
  {provide: TRANSLATIONS, useValue: dictionary},
];

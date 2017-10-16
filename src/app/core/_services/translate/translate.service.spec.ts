import {dictionary as TRANSLATIONS} from './translations';
import {TranslateService} from './translate.service';

// TODO, need to refactor the code according to the new changes
import {LANG_EN_NAME, LANG_ES_NAME, LANG_ZH_NAME} from './translations';

let translateService;

describe('TranslateService', () => {
  beforeEach(() => {
    translateService = new TranslateService(TRANSLATIONS);
  });

  // clear localStorage to provide a clean slate for every test
  // and allow tests to be independent of each other
  afterEach(() => {
    localStorage.removeItem(TranslateService.CURRENT_LANG);
  });

  it('sets the language to English by default', () => {
    const expected = LANG_EN_NAME;
    const actual = translateService.currentLang;
    expect(actual).toEqual(expected);
  });

  // the next two tests are testing the same concept, but they test
  // different public/ protected properties of the class
  // the first tess `currentLang` and the second tests `use`
  it('sets and remembers language globally and between instances', () => {
    translateService.currentLang = LANG_ES_NAME;
    translateService = new TranslateService(TRANSLATIONS);
    const actual = translateService.currentLang;
    const expected = LANG_ES_NAME;
    expect(actual).toEqual(expected);
  });

  it('allows selected language to change after instantiation', () => {
    translateService.use(LANG_ZH_NAME);
    const expected = LANG_ZH_NAME;
    const actual = translateService.currentLang;
    expect(actual).toEqual(expected);
  });

  // default language is English, no translation occurs.
  it('translates text using the default language if no language is provided', () => {
    const expected = 'Submit';
    const actual = translateService.instant('Submit');
    expect(actual).toEqual(expected);
  });

  // test `instant` method, set Spanish as the language and translate to it
  it('translates text to the pre-selected language', () => {
    translateService.use(LANG_ES_NAME);
    const actual = translateService.instant('Submit');
    const expected = 'Enviar';
    expect(actual).toEqual(expected);
  });

  // test `instantWithLang`, check that language used is Mandarin instead of English
  // when it is provided as an argument
  it('translates text to a specific language', () => {
    const expected = '提交';
    const actual = translateService.instantWithLang('Submit', LANG_ZH_NAME);
    expect(actual).toEqual(expected);
  });
});

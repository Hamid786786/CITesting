import {browser, by, element} from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a login page', () => {
    expect<any>(element(by.css('pl-login')).isPresent()).toEqual(true);
  });

  it('should have a top navbar', () => {
    expect<any>(element(by.css('pl-top-nav')).isPresent()).toEqual(true);
  });

  it('should have a carousel', () => {
    expect<any>(element(by.css('pl-carousel')).isPresent()).toEqual(true);
  });

  it('should have a login form component', () => {
    expect<any>(element(by.css('login-form')).isPresent()).toEqual(true);
  });
});

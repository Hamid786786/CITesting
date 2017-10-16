import {NavigationExtras} from '@angular/router';

export class RouterStub {
  public navigate(commands: any[], extras?: NavigationExtras) {
    return null;
  }

  public navigateByUrl(url: string, extras?: NavigationExtras) {
    return null;
  }
}

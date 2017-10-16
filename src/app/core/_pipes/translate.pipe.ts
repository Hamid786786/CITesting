import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@pl-core/_services';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {
  constructor(private _translate: TranslateService) {
  }

  public transform(value: string, args: any[]): any {
    if (!value) {
      return;
    }
    return this._translate.instant(value);
  }
}

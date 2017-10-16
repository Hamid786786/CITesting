import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTitleCase'
})
export class TitleCasePipe implements PipeTransform {
  public transform(input: any): any {
    if (input) {
        input = input || '';
        return input.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
  }
}

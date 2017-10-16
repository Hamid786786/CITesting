import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {
  public transform(input: any): any {
    if (input) {
        input = input || '';
        return input.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, (str) => {  return str.toUpperCase(); });
    }
  }
}

import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  public transform(timestamp: any): any {
    let intTS = Number(timestamp);
    if (intTS) {
        let currentDate = new Date().toDateString();
        if (currentDate === new Date(intTS).toDateString()) {
           return moment(intTS).format('h:mm a');
        } else {
            return moment(intTS).format('MMM DD');
        }

    }
  }
}

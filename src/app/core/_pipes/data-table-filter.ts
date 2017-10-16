import {filter} from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTableFilter'
})
export class DataFilterPipe implements PipeTransform {
  public transform(array: any[], query: string): any {
    if (query) {
      return filter(array, (row) => row.equipmentDetails.indexOf(query) > -1);
    }
    return array;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { MyModel } from 'app/models/my-model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: MyModel[], searchText?: any): any {
    if (searchText === '') {
      return list;
    }

    if (list.length > 0) {
      return list.filter((obj) => obj.name.toLocaleLowerCase().search(searchText.toLocaleLowerCase()) !== -1);
    }


  }

}

import { Injectable } from '@angular/core';
import { MyModel } from 'app/models/my-model';

@Injectable()
export class DataListService {

  public list: MyModel[] = [];


  constructor() {
    this.list = [{
      name: 'Jon',
      joining_date: new Date(2015, 10, 23),
      age: 23
    },
    {
      name: 'Viki',
      joining_date: new Date(2015, 1, 24),
      age: 20
    },
    {
      name: 'Abc',
      joining_date: new Date(2015, 10, 25),
      age: 43
    }, {
      name: 'XYZ',
      joining_date: new Date(2015, 10, 28),
      age: 21
    }];
  }

  public getList(): MyModel[] {
    return this.list;
  }

  public addNewEntry(obj: MyModel) {
    this.list.push(obj);
  }

  public sortList() {
    this.list.sort((a, b) => {
      if (a.joining_date > b.joining_date) {
        return 1;
      }
      if (a.joining_date < b.joining_date) {
        return -1;
      }
      // a must be equal to b
      return 0;


    });
  }
}

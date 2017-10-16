import { Component, OnInit } from '@angular/core';
import { DataListService } from 'app/services/data-list.service';
import { MyModel } from 'app/models/my-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataListService]
})
export class AppComponent implements OnInit {
  public searchName = '';
  constructor(private _list: DataListService) { }

  ngOnInit() {
    let obj: MyModel;
    let i = 0;
    let addInterval;
    const length = this._list.getList().length;
    addInterval = setInterval(() => {
      obj = this._list.getList()[i++]
      const newObj = new MyModel();
      newObj.name = obj.name;
      newObj.age = this.reverse(obj.age);
      newObj.joining_date = new Date();
      newObj.joining_date.setTime(obj.joining_date.getTime() + 86400000);
      this._list.addNewEntry(newObj);
      if (i === length) {
        clearInterval(addInterval);
      }
    }, 60000);
  }

  public reverse(age: number): number {
    let revAge = 0;
    let r = age % 10;

    while (age > 0) {
      revAge = revAge * 10 + r;
      age = Math.floor(age / 10);
      r = age % 10;
    }
    return revAge;
  }

  public sortList() {
    this._list.sortList();
  }
  public test() {
    //
  }
}

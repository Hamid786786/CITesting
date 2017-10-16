import { Component, OnInit } from '@angular/core';
import {GLOBAL, CONFIG} from '@pl-core/_config';

@Component({
  selector: 'app-dyn-module-subcomponent',
  templateUrl: './dyn-module-subcomponent.component.html',
  styleUrls: ['./dyn-module-subcomponent.component.scss']
})
export class DynModuleSubcomponentComponent implements OnInit {
  public searchUrl: string = CONFIG.urls.EquipmentSearch;
  constructor() {
    //
  }

  public ngOnInit() {
    //
  }
  public redirectSearch(data) {
    console.log(data);
  }

}

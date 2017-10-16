import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { GlobalCreateService } from '@pl-core/_services';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  public path: any;
  public createData: any;
  public _globalResSub: Subscription;
  public moduleId: any;
  constructor( private _routes: ActivatedRoute,
               private _globalCreateService: GlobalCreateService,
               private _router: Router,

              ) { }

  public ngOnInit() {
      this.path = this._router.url.split('/')[1];
      this.moduleId = this._router.url.split('/')[3];
      this._globalResSub = this._globalCreateService.getModuleData(this.path, this.moduleId).subscribe((_res) => {
        this.createData = _res.createData;
      });
  }

}

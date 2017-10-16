import { DynModuleService } from '@pl-core/_services';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {DialogComponent} from '@pl-modules/dialog/dialog.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '@pl-core/_services';

@Component({
  selector: 'app-equipment-dailogue',
  templateUrl: './dyn-module-dailogue.component.html',
  styleUrls: ['./dyn-module-dailogue.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DynModuleDailogueComponent implements OnInit{
  public data;
  public name;
  public exportFlag = false;
  public welcomeFlag = false;
  public moduleId: any;
  public userVisiblityData;
  public id;
  public currentUser;

  constructor(public dialogRef: MdDialogRef<DialogComponent>,
              private route: ActivatedRoute,
              public _equipmentService: DynModuleService,
              public _authService: AuthService
            ) {
  }
  public ngOnInit() {
    this.currentUser = this._authService.currentUser();
    if (this.name === 'export') {
      this.exportFlag = true;
    } else if (this.name === 'welcome'){
      this.welcomeFlag = true;
    }
    this._equipmentService.getStartedStatusForUser(this.currentUser.id).subscribe((response) => {
      this.userVisiblityData = response;
    });
  }

  public close() {
    this.dialogRef.close();
  }
  public updateVisibility() {
    this.userVisiblityData.visibility.push(this.moduleId);
    this._equipmentService.putStartedStatusForUser(this.currentUser.id, this.userVisiblityData).subscribe((res) => {
      console.log('RESPONSE', res);
    });
  }
}

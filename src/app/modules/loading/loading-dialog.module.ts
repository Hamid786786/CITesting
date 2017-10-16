import {NgModule} from '@angular/core';
// DONOT IMPORT CORE MODULE AS IT WILL GENERATE A CYCLIC DEPENDENCY
// import { CoreModule } from '@pl-core/core.module';
import {MaterialModule} from '@angular/material';
import {LoadingDialogComponent} from './loading-dialog.component';

@NgModule({
  imports: [MaterialModule],
  exports: [LoadingDialogComponent],
  declarations: [LoadingDialogComponent],
  providers: []
})

export class LoadingDialogModule {
}

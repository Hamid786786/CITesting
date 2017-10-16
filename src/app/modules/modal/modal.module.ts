import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@pl-core/core.module';
import {ModalComponent} from './modal.component';

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  providers: []
})

export class ModalModule {
}

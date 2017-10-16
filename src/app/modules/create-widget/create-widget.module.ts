import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWidgetComponent } from './create-widget.component';
import {CoreModule} from '@pl-core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [CreateWidgetComponent],
  exports: [CreateWidgetComponent]
})
export class CreateWidgetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@pl-core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NavModule} from '../nav/nav.module';
import { BrowserModule, Title }  from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavModule,
    CoreModule,
    BrowserModule
  ],
  declarations: [HomeComponent],
  providers: [Title]
})
export class HomeModule {}

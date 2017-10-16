/**
 * The core module consolidates components and services that are only
 * required in the root AppComponent into one cohesive block. This
 * means the core module only needs to be imported once across the whole
 * application.
 *
 * Singleton, application-wide services which we only need one unique
 * instance of are also registered here in the providers array.
 */

import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';
import {LoadingDialogModule} from '@pl-modules/loading/loading-dialog.module';
import {throwIfAlreadyLoaded} from './core-import-guard';
import {LoadingDialogComponent} from '@pl-modules/loading/loading-dialog.component';

import {
  ExternalClickDirective, SortByDirective, AlertComponent, TableColumnDirective, DragColDirective, DropColDirective
} from '@pl-core/_directives';

import {
  SafePipe,
  TranslatePipe,
  TitleCasePipe,
  DateFormatPipe,
  SentenceCasePipe,
  KeysPipe
} from '@pl-core/_pipes';

const DIRECTIVES = [
  ExternalClickDirective, SortByDirective, AlertComponent, TableColumnDirective, DragColDirective, DropColDirective
];

const PIPES = [
  SafePipe,
  TranslatePipe,
  TitleCasePipe,
  DateFormatPipe,
  SentenceCasePipe,
  KeysPipe
];

const LIBRARY_MODULES = [
  CommonModule, FormsModule, ReactiveFormsModule, HttpModule, FlexLayoutModule, MaterialModule, LoadingDialogModule
];

@NgModule({
  imports: [...LIBRARY_MODULES],
  declarations: [...DIRECTIVES, ...PIPES],
  exports: [...LIBRARY_MODULES, ...DIRECTIVES, ...PIPES],
  providers: [],
  entryComponents: [LoadingDialogComponent]
})

export class CoreModule {
}

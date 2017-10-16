import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleSubcomponentComponent } from './dyn-module-subcomponent.component';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {MdRipple, MdTooltip, MdCardTitle, MdCardHeader, MdListItem, MdList, MdIcon, MdInputContainer, MdCardContent, MdCardActions, MdCard} from '@angular/material';
import {SearchComponent} from '../search/search.component';
import {SentenceCasePipe} from '@pl-core/_pipes/sentenceCase.pipe';
import { DynModuleSubcomponentModule } from './dyn-module-subcomponent.module';

describe('DynModuleSubcomponentComponent', () => {
  let component: DynModuleSubcomponentComponent;
  let fixture: ComponentFixture<DynModuleSubcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, DynModuleSubcomponentModule ],
      declarations: [ DynModuleSubcomponentComponent, TranslatePipe, MdCardTitle, MdCardHeader, MdListItem, MdList, MdIcon,
        MdInputContainer, MdCardContent, MdCardActions, MdCard, SearchComponent, MdRipple, MdTooltip, SentenceCasePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModuleSubcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

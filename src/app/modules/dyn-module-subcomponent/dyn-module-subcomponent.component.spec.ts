import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslatePipe} from '@pl-core/_pipes/translate.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {MdRipple, MdTooltip, MdCardTitle, MdCardHeader, MdListItem, MdList, MdIcon, MdInputContainer, MdCardContent, MdCardActions, MdCard} from '@angular/material';
import {SearchComponent} from '../shared/search/search.component';
import {SentenceCasePipe} from '@pl-core/_pipes/sentenceCase.pipe';
import {DynModuleSubcomponentComponent} from '../shared/dyn-module-subcomponent/dyn-module-subcomponent.component';

describe('DynModuleSubcomponentComponent', () => {
  let component: DynModuleSubcomponentComponent;
  let fixture: ComponentFixture<DynModuleSubcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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

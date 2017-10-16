import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {CoreModule} from '@pl-core/core.module';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {FilterTextComponent} from './filter-text.component';
import {FilterTextService} from '@pl-core/_services';
import {TranslateService} from '@pl-core/_services/translate/translate.service';

let comp: FilterTextComponent;
let fixture: ComponentFixture<FilterTextComponent>;
let filterDE: DebugElement;
let filterInput: HTMLInputElement;
let filterService: FilterTextService;

class FilterTextServiceStub {
  public updateFilter(value: string) {
    return value;
  }

  public filter(query: string, props: string[], sourceList: any[]) {
    return query;
  }
}

describe('FilterTextComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [FilterTextComponent],
      providers : [TranslateService]
    })

    // override component's own provider
      .overrideComponent(FilterTextComponent, {
        set: {
          providers: [
            {provide: FilterTextService, useClass: FilterTextServiceStub}
          ]
        }
      });

    fixture = TestBed.createComponent(FilterTextComponent);
    comp = fixture.componentInstance;
    filterDE = fixture.debugElement.query(By.css('#filterText'));
    filterInput = filterDE.nativeElement;
    filterService = filterDE.injector.get(FilterTextService);

    // trigger initial data binding for ngModel and (keyup)
    fixture.detectChanges();
  });

  it('text field should be empty initially', () => {
    expect(filterInput.value).toEqual('');
    expect(comp.filter).toBeUndefined('filter property undefined');
  });

  // test event binding for ngModel
  it('entering text should update the bound property', () => {
    filterInput.value = 'Retribution';

    // dispatch DOM event so Angular realises field has changed
    filterInput.dispatchEvent(new Event('input'));
    // make Angular detect the raised event and update the bound property
    fixture.detectChanges();

    // alternative:
    // filterDE.triggerEventHandler('ngModelChange', filterInput.value);

    expect(comp.filter).toEqual('Retribution');
  });

  // test property binding for ngModel
  it('changing bound property should update text field', fakeAsync(() => {
    comp.filter = 'Protection';

    // detect change in bound property
    fixture.detectChanges();

    // simulate async passage of time so Angular updates the DOM accordingly
    tick();

    expect(filterInput.value).toEqual('Protection');
  }));

  it('keyup event should call onFilterChange()', () => {
    const changedSpy = spyOn(comp, 'onFilterChange').and.callThrough();
    const updateSpy = spyOn(filterService, 'updateFilter');
    filterDE.triggerEventHandler('keyup', document.createEvent('KeyboardEvent'));

    expect(changedSpy.calls.any()).toBe(true, 'call onFilterChange()');
    expect(updateSpy.calls.any()).toBe(true, 'call updateFilter()');
  });

  // need to test clear()?
});

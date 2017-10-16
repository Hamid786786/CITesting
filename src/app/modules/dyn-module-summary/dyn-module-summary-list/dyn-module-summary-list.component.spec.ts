import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModuleSummaryListComponent } from './dyn-module-summary-list.component';

describe('DynModuleSummaryListComponent', () => {
    let component: DynModuleSummaryListComponent;
    let fixture: ComponentFixture<DynModuleSummaryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DynModuleSummaryListComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynModuleSummaryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

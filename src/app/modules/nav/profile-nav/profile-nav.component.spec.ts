import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavNewComponent } from './profile-nav.component';

describe('ProfileNavComponent', () => {
  let component: ProfileNavNewComponent;
  let fixture: ComponentFixture<ProfileNavNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNavNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed, async, fakeAsync, tick, inject, TestComponentRenderer} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {CoreModule} from '@pl-core/core.module';
import {CarouselComponent} from './carousel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// --- Declarations and helpers ---
let comp: CarouselComponent;
let fixture: ComponentFixture<CarouselComponent>;
let de: DebugElement;
let page: Page;

class Page {
  public wrapper;
  public container;
  public indi; // indicators used for switching carousel items...
  public slides;

  constructor() {
    this.wrapper = de.query(By.css('.carousel-wrapper'));
    this.container = de.query(By.css('.carousel-container'));
    this.indi = de.queryAll(By.css('li'));
    this.slides = de.queryAll(By.css('.carousel-slide'));
  }

  public updateIndi() {
    this.indi = de.queryAll(By.css('li'));
  }

  public updateSlide() {
    this.slides = de.queryAll(By.css('.carousel-slide'));
  }
}

function createComponent(): void {
  fixture = TestBed.createComponent(CarouselComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
  page = new Page();

  // First change detection round triggers ngOnInit() and all
  // data/property/event bindings in the template

  // provide slides here when creating the component
  comp.slides = [
    {
      description: 'Dummy 1',
      url: 'assets/img/carousel1.jpg',
      state: 'current'
    },
    {
      description: 'Dummy 2',
      url: 'assets/img/carousel2.jpg',
      state: 'right'
    },
    {
      description: 'Dummy 3',
      url: 'assets/img/carousel3.jpg',
      state: 'right'
    }
  ];
  fixture.detectChanges();
  page.updateIndi();
  page.updateSlide();
}

describe('CarouselComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, BrowserAnimationsModule],
      declarations: [CarouselComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore psuedo elements except for angular defined ones such as ngFor and ngIf...
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    createComponent();
  });

  it('renders a wrapper and a container', () => {
    expect(page.wrapper).toBeDefined();
    expect(page.container).toBeDefined();
  });

  it('renders the first image', () => {
    const expected = `assets/img/carousel1.jpg`;
    const slide = page.slides[0].nativeElement;
    const actual = page.slides[0].nativeElement.style.backgroundImage;
    expect(actual).toContain(expected);
    expect(slide.className).toContain('active');
  });

  it('renders indicators for all images', () => {
    const expected = comp.slides.length;
    const actual = page.indi.length;
    expect(actual).toEqual(expected);
  });

  it('renders slides for all images', () => {
    const expected = comp.slides.length;
    const actual = page.slides.length;
    expect(actual).toEqual(expected);
  });

  it('onIndiClick to be called when an indicator is clicked', async(() => {
    spyOn(comp, 'onIndiClick');
    let targetEl = page.indi[1].nativeElement;
    targetEl.click();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(comp.onIndiClick).toHaveBeenCalled();
        expect(comp.onIndiClick).toHaveBeenCalledWith(1);
      });
  }));

  it('updates the class of the clicked indicator to active', async(() => {
    let targetEl = page.indi[1].nativeElement;
    targetEl.click();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        page.updateIndi();
        const actual = targetEl.className;
        const expected = 'active';
        expect(actual).toContain(expected);
      });
  }));

  it('updates the slide state when indicator is clicked', async(() => {
    let targetEl = page.indi[1].nativeElement;
    targetEl.click();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        const expected = 'current';
        const actual = comp.slides[1].state;
        expect(actual).toEqual(expected);
      });
  }));

  it('updates the image when indicator is clicked', async(() => {
    let targetEl = page.indi[1].nativeElement;
    let slide = page.slides[1].nativeElement;
    targetEl.click();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        console.log(slide);
        const actual = slide.className;
        const expected = 'active';
        expect(actual).toContain(expected);
      });
  }));
});

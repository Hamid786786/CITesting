import {
  Component, AfterViewInit, Input, Output, EventEmitter,
  ViewChildren, QueryList,
  trigger, state, style, animate, transition
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ICarouselSlide} from '@pl-core/_interfaces';

@Component({
  selector: 'pl-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('left', style({opacity: 0, transform: 'translateX(-100%)'})),
      state('right', style({opacity: 0, transform: 'translateX(100%)'})),
      state('current', style({opacity: 1, transform: 'translateX(0%)'})),
      transition('current => right', [
        animate(200, style({transform: 'translateX(100%)'}))
      ]),
      transition('left => current', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('current => left', [
        animate(200, style({transform: 'translateX(-100%)'}))
      ]),
      transition('right => current', [
        style({transform: 'translateX(100%)'}),
        animate(200)
      ])
    ]),
  ]
})

export class CarouselComponent {
  public carouselIndex = 0;
  @Input() public slides: ICarouselSlide[]; /*Input for Carousel Slides*/
  @Input() public isArrow: boolean;
  private currentIndex: number = 0;
  public onIndiClick(index: number): void {
    // Get the number of slide states to update excluding the clicked slide
    let slidesToUpdate: number = this.getIndexDifference(index);
    if (slidesToUpdate >= this.slides.length) {
      return;
    } // failsafe

    if (this.currentIndex > index) { // slide right
      while (slidesToUpdate > 0) {
        slidesToUpdate -= 1;
        this.slides[this.currentIndex - slidesToUpdate].state = 'right';
      }
    } else if (this.currentIndex < index) { // slide left
      while (slidesToUpdate > 0) {
        slidesToUpdate -= 1;
        this.slides[this.currentIndex + slidesToUpdate].state = 'left';
      }
    }

    this.slides[index].state = 'current';
    this.currentIndex = index;
  }

  public arrowBefore() {
    if (this.currentIndex > 0) {
      this.onIndiClick(this.currentIndex - 1);
      this.toggleItem(this.currentIndex);
    }
  }
  public arrowAfter() {
    if (this.currentIndex < this.slides.length - 1) {
      this.onIndiClick(this.currentIndex + 1);
      this.toggleItem(this.currentIndex);
    }
  }

  public toggleItem(index) {
    this.carouselIndex = index;
  }

  private getIndexDifference(index: number): number {
    return Math.abs(this.currentIndex - index);
  }

}

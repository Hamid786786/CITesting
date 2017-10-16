/**
 *  Directive to be used with SorterService to sort a collection of
 *  objects by a given property.
 *  @Input() property 'sort-by' indicates which object property to
 *  sort by.
 *  @Output() property 'sorted' will emit a string representing the
 *  'sort-by' input property.
 */

import {
  Directive, Input, Output,
  EventEmitter, ElementRef, HostBinding
} from '@angular/core';

@Directive({
  selector: '[sortBy]'
})

export class SortByDirective {
  @Output() public sorted = new EventEmitter<string>();

  @Input('sort-by')
  set sortBy(value: string) {
    this.sortProperty = value;
  }

  private sortProperty: string;

  constructor(private el: ElementRef) {
  }

  @HostBinding('click')
  public onClick(event: any): void {
    event.preventDefault();
    this.sorted.emit(this.sortProperty);
  }
}

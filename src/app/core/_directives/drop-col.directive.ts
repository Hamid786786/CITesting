import {Directive, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
@Directive({
  selector: '[dropCol]'
})
/*Drop event Listner For dragging of columns*/
export class DropColDirective {
  @Output() public swapColumns: EventEmitter<any> = new EventEmitter<any>();
  constructor(private el: ElementRef) {
    this.el = el;
  }
  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  public onDragOver(event) {
       event.preventDefault();
  }

  /**
   * to handle drop for the element
   * @param event
   */
  @HostListener('drop', ['$event'])
  public onDrop(event) {
    event.preventDefault();
    let previousId = event.dataTransfer.getData('text').split('_').map(Number);
    let currentId;
    if (event.target.tagName.toLowerCase() === 'md-header-cell') {
      currentId = event.target.id.split('_').map(Number);
    } else {
      currentId = this.getParentElement(event.target, 'md-header-cell').id.split('_').map(Number);
    }
    let dragList = localStorage.getItem('isDrag');
    if (currentId[0] && (currentId[0] !== previousId[0]) && previousId[0]  && dragList) {
      let swapData = {
        currentId: previousId[0],
        currentOrder: previousId[1],
        newId: currentId[0],
        newOrder: currentId[1]
      };
      localStorage.setItem('isDrag', 'false');
      this.swapColumns.emit(swapData);
    }
  };

  private getParentElement(element, selector) {
    let current = element;
    if (current.tagName.toLowerCase() === selector) {
      return current;
    } else {
      for (let counter = 0; counter < 5; counter ++) {
        if ( current.tagName.toLowerCase() === selector ) {
          return current;
        }
        current = current.parentElement;
      }
      return current;
    }
  }
}

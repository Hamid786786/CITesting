import {Directive, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
@Directive({
  selector: '[dragCol]'
})
/*Drag event Listner For dragging of columns*/
export class DragColDirective {
  constructor(private el: ElementRef) {
    this.el = el;
  }

  @HostListener('dragstart', ['$event'])
  public onDragStart(event) {
    localStorage.setItem('isDrag', 'true');
    event.dataTransfer.setData('text' , event.target.id);
  }
}

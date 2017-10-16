/**
 *  Creates a global click event listener on the host element. If the
 *  event's target is located outside the host element, emit an
 *  externalClick event.
 *
 *  WARNING:
 *  Angular's ElementRef API is not compatible with server-side
 *  renderers or web workers since it relies on having direct DOM
 *  access. Use the Renderer API and template data binding to ensure
 *  decoupling between the application model and rendering the view.
 *  i.e. instead of calling methods on elementRef.nativeElement
 *  directly, use the Renderer API instead (invokeElementMethod)
 */

import {
  Directive, Output, EventEmitter, HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[externalClick]',
})

export class ExternalClickDirective {
  @Output() public externalClick = new EventEmitter();

  // Inject a reference to the host element
  constructor(private _elementRef: ElementRef) {
    // console.log('Instantiated external click directive');
  }

  @HostListener('document:click', ['$event.target'])
  public onGlobalClick(target: HTMLElement) {
    const isInternalClick: boolean =
      this._elementRef.nativeElement.contains(target);

    // Should try to do this instead, but invokeElementMethod()
    // returns void :(
    // this._renderer.invokeElementMethod(
    //   this._elementRef.nativeElement, 'contains', [target])

    if (!isInternalClick) {
      this.externalClick.emit(null);
    }
  }
}

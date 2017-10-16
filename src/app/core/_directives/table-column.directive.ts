import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[colWidth]'
})
export class TableColumnDirective  implements OnInit {
  @Input() public fieldWidth: number;
  @Input() public alignment: string;
  @Input() public tableScroll: string;
  constructor(private el: ElementRef, public renderer: Renderer) {
    this.el = el;
  }

  public ngOnInit() {
    this.renderer.setElementStyle(this.el.nativeElement, 'flex', '0 0 ' + this.fieldWidth);
    this.renderer.setElementStyle(this.el.nativeElement, 'text-align',  this.alignment);
    this.renderer.setElementStyle(this.el.nativeElement, 'overflow',  this.tableScroll);
  }
}

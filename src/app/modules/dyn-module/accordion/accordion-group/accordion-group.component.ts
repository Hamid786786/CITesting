import { Component, OnDestroy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AccordionComponent } from '../accordion.component';

@Component({
  selector: 'app-accordion-group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AccordionGroupComponent {
  @Input() public header: string;
  @Input() public group: boolean;
  @Output() public moreData = new EventEmitter<any>();

  constructor(private accordion: AccordionComponent) {
    console.log(this.group);
  }
  public moreDetails(id) {
    this.moreData.emit(id);
  }
}

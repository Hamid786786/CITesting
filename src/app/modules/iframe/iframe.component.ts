import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './iframe.component.html',
  selector: 'pl-iframe',
  styles: [`
    iframe {
      background: white;
    }
  `]
})
export class IframeComponent {
  @Input() public url;
}

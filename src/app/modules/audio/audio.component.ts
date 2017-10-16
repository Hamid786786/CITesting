import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  @Input() public src; // The src expects audio input
  constructor() {
    //
  }
}

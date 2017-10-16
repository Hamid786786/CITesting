import {
  Component, OnInit, Output, EventEmitter, trigger,
  state, style, animate, transition
} from '@angular/core';
import {AuthService} from '@pl-core/_services';

import {User} from '@pl-core/_models';

@Component({
  selector: 'pl-nav-setting',
  templateUrl: './nav-setting.component.html',
  styleUrls: ['./nav-setting.component.scss'],
  animations: [
    trigger('setting', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      transition('void <=> *', [
        animate('200ms ease-out')
      ])
    ])
  ]
})

export class SettingNavComponent implements OnInit {

  public currentUser: User;
  @Output() public toggleSettingsEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _authService: AuthService) {
  }

  public ngOnInit() {
    this.currentUser = this._authService.currentUser();
  }

  public hide(): void {
    this.toggleSettingsEmitter.emit();
  }
}

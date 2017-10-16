/**
 *  Modal dialog box with transcluded content (through ng-content)
 *  Inputs:
 *  - static: boolean - if true, closes modal on background click
 *  Outputs:
 *  - onShow - emits an event when modal is shown programmatically
 *  - onHide - emits an event when modal is hidden programmatically
 *
 *  ISSUES:
 *  - Broken without Bootstrap, need to copy styles over
 *  - Disable scrolling while modal is visible?
 *  - Add selectors for ng-content (header, footer, etc.)
 *  - Tabbing is not restricted to modal only - other page elements
 *    are focusable, allowing the user to bypass modal, resulting in
 *    risk of unexpected behaviour
 *  - CSS max-height and max-width on .modal-dialog/.modal-body does
 *    not scale properly to smaller viewports
 */

import {
  Component, OnInit, Input, Output, EventEmitter,
  HostListener, ViewChild, ContentChild, ElementRef, Renderer
} from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {FormComponent} from '@pl-modules/dynamic-form/form.component';
import {TranslateService} from '@pl-core/_services/translate/translate.service';

export interface ModalSettings {
  static?: boolean;
  title?: string;
  maxWidth?: string;
}

@Component({
  selector: 'pl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('backdrop', [
      state('visible', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate('100ms ease-in')
      ]),
      transition('* => void', [
        animate('100ms ease-out', style({
          opacity: 0
        }))
      ])
    ]),
    trigger('modal', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate('100ms')
      ]),
      transition('* => void', [
        animate('100ms', style({
          transform: 'scale3d(.0, .0, .0)'
        }))
      ])
    ])
  ]
})

export class ModalComponent implements OnInit {
  @Input() public settings: ModalSettings;

  public isVisible: boolean = false;

  @Output() public onShow = new EventEmitter();
  @Output() public onHide = new EventEmitter();

  public defaultSettings: ModalSettings = {
    static: false,
    title: 'Modal',
    maxWidth: '500px',
  };

  @ViewChild('backdrop') public backdropEl: ElementRef;
  @ContentChild(FormComponent) public formComp: FormComponent;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              private translate: TranslateService) {
  }

  // Attaches a click event listener to the component, closing
  // the modal if the backdrop was clicked.
  // Todo: try rewrite without calling methods on nativeElement directly
  @HostListener('click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!this.isVisible) {
      return;
    }

    const isBackdropClick: boolean =
      this.backdropEl.nativeElement.isSameNode(target);

    if (isBackdropClick && !this.settings.static) {
      this.hide();
    }
  }

  public ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
  }

  public show() {
    this.isVisible = true;
    this.onShow.emit();
  }

  public hide() {
    this.isVisible = false;
    this.onHide.emit();
  }

  public submit() {
    // console.log('submit');
  }
}

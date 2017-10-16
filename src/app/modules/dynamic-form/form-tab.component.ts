/**
 *  Tabs act as a container for transcluded dynamic form components.
 *
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'pl-form-tab',
  templateUrl: './form-tab.component.html',
  styles: [`
    .panel-primary {
      margin-bottom: 1rem;
    }

    .collapsed {
      display: none !important;
    }

    .not-collapsed {
      display: flex !important;
    }

    .pull-right {
      float: right !important;
    }

    .panel-primary:first {
      margin-top: 1rem;
    }

    .panel-primary > .panel-heading > .icofont {
      color: #fff;
      font-size: 1.25rem;
    }

    .panel-primary > .panel-heading {
      color: #fff;
      background-color: #337ab7;
      border-color: #337ab7;
      margin-bottom: 1rem;
    }

    .panel-title {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 16px;
      color: inherit;
    }

    .panel-body {
      display: flex;
      border: 1px solid #ddd;
      box-sizing: border-box;
      display: block;
      flex-direction: column;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      max-width: 100%;
      align-items: center;
      -webkit-box-pack: start;
      -webkit-box-align: center;
      overflow: visible;
      height: auto;
    }`]
})

export class FormTabComponent {
  @Input() public name: string;
  public isCollapsed = false;

  public toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}

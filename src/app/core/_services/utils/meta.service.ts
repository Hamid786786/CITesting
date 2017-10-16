import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

// DONOT USE UNLESS ANGULAR 2 CANNOT HANDLE
import $ from 'jquery';

@Injectable()
export class MetaService {

  constructor(private _titleService: Title) {
  }

  public setTitle(title: string): void {
    this._titleService.setTitle(title);

    // DONOT USE UNLESS ANGULAR 2 CANNOT HANDLE
    // $('#head-meta-DSC').attr('content', title);
    document.querySelector('#head-meta-DSC').setAttribute('content', title);
  }

  public setFavicon(url: string): void {
    // DONOT USE UNLESS ANGULAR 2 CANNOT HANDLE
    // let doc = document.querySelector;
    document.querySelector('#head-link-ATI').setAttribute('href', url);
    document.querySelector('#head-link-ICO').setAttribute('href', url);
    document.querySelector('#head-link-TIL').setAttribute('content', url);
   /* $('#head-link-ATI').attr('href', url);
    $('#head-link-ICO').attr('href', url);
    $('#head-link-TIL').attr('content', url);*/
  }

}

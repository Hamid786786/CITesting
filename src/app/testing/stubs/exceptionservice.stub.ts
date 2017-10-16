import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export class ExceptionServiceStub {

  public catchBadResponse(errorResponse: any): Observable<any> {
    let res = <Response> errorResponse;
    let err = res.json();
    let emsg = err ?
      (err.error ? err.error : JSON.stringify(err)) :
      (res.statusText || 'unknown error');
    // this.toastService.activate(`Error - Bad Response - ${emsg}`);
    console.log(emsg);
    // return Observable.throw(emsg); // TODO: We should NOT swallow error here.
    return Observable.of(false);
  }
}

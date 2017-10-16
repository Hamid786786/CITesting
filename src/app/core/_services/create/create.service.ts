import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '@pl-core/_config';
import {ExceptionService} from '@pl-core/_services';
import {FormService} from '@pl-core/_services';
import {Form, GetForm} from '@pl-core/_models';

@Injectable()
export class CreateService {

  constructor(private http: Http,
              private exceptionService: ExceptionService,
              private formService: FormService) {
  }

  public getMetadata(options: GetForm): Observable<Form> {
    return this.http
      .get(CONFIG.urls.dynFormCreateResource)
      .map((response) => {
        const {form} = response.json();
        const res = this.formService.toForm(form);
        return {...form, formGroup: res} as Form;
      })
      .catch(this.exceptionService.catchBadResponse);

  }
}

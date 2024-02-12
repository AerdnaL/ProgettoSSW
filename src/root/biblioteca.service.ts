import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Injectable()
export class BibliotecaService {
  key: string = '2c526921';
  base: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  metodoGet: string = 'get';
  metodoPost: string ='set';
  urlGet: string = this.base + this.metodoGet + '?key=' + this.key;
  urlPost: string = this.base + this.metodoPost + '?key=' + this.key;

  constructor() { }

  public getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.urlGet,
      crossDomain: true,
    });
  }

  public postData(ilDato: any): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.urlPost,
      crossDomain: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ilDato)
    });
  }
}
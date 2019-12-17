import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GLOBAL } from './global';

@Injectable()

export class MessageService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  sendMessage(body) {
    return this._http.post(this.url + 'formulario', body).pipe(res => res);
    }
}

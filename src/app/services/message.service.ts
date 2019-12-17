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
    let params = JSON.stringify(body);
    console.log('luego de json.stringify' + params);
    console.log('va  ahacer el post con el body : ' + body);
    return this._http.post( this.url + 'formulario', body);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { GLOBAL } from './global';
import { Reserve } from '../../app/models/reserve';


@Injectable()

export class MessageService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  sendMessage(body) {
    /*
    let params = JSON.stringify(body);
    let headers = new HttpHeaders({
      'content-type':'application/json'
    });
    console.log('luego de json.stringify' + params);
    */
    console.log('va  ahacer el post con el body : ' + body);

    return this._http.post('/formulario', body); // , {headers:headers}).pipe(res=>res);
    }
}

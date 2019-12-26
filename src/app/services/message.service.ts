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

    console.log('luego de json.stringify' + params);
    */
    let headers = new HttpHeaders({
      'content-type':'application/json'
    });
    console.log('va  ahacer el post con el body : ' + body);
    // tslint:disable-next-line: max-line-length
    return this._http.post('https://peaceful-springs-20903.herokuapp.com/formulario', body, {headers:headers}).pipe(res=>res); // , {headers:headers}).pipe(res=>res);

    }

    sendMessageJet(body, type) {
      /*
      let params = JSON.stringify(body);

      console.log('luego de json.stringify' + params);
      */
      let headers = new HttpHeaders({
        'content-type':'application/json'
      });
      console.log('va  ahacer el post con el body : ' + body);
      // tslint:disable-next-line: max-line-length
      if(type == "contact") {
        return this._http.post('https://peaceful-springs-20903.herokuapp.com/formularioJetContact', body, {headers:headers}).pipe(res=>res); // , {headers:headers}).pipe(res=>res);
      }else {
        return this._http.post('https://peaceful-springs-20903.herokuapp.com/formularioJetReserve', body, {headers:headers}).pipe(res=>res); // , {headers:headers}).pipe(res=>res);
      }

      }
}

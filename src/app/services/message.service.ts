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


  sendMessageJet(body){
  const mailjet = require('node-mailjet')
  .connect('4cbd5249f600247cbc93feb7ea46f022', '53de9b997c3a99b37cc1911a2d3ec44f')
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "lucianoyabra@gmail.com",
          "Name": "Luciano"
        },
        "To": [
          {
            "Email": "lucianoyabra@gmail.com",
            "Name": "Luciano"
          }
        ],
        "Subject": "Greetings from Mailjet.",
        "TextPart": "My first Mailjet email",
        "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
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
}

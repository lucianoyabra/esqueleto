import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Reserve } from '../../models/reserve';
import { GLOBAL } from '../../services/global';
import { ReserveService } from '../../services/reserve.service';
import { WebsocketService } from '../../socket/websocket.service';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';

@Component({
  selector: 'app-reserve-detail',
  templateUrl: '../reserve-detail/reserve-detail.component.html',
  providers: [UserService,ReserveService,EventService,WebsocketService]
})
export class ReserveDetailComponent implements OnInit {
  public titulo: string;
  public identity;
  public token;
  public url:string;
  public alertMessage:string;
  public isEdit ;
  public filesToUpload:Array<File>;
  public event: Event;
  public reserves: Reserve[];
  public socket: SocketIOClient.Socket;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _reserveService: ReserveService,
    private _eventService: EventService,
    private _webSocketService: WebsocketService){
      this.titulo = 'Reservas del día';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.socket = io.connect('http://localhost:3000');
      // this.reserve = new Reserve('','','',null,'',null);

   }

  ngOnInit() {
    console.log('reserve-add.component.ts cargado');
     this.socket.on('new reserve found', (data: any) =>
    {
       this.getReserves();
     });
    this.getReserves();


  }

  getReserves(){
    this._route.params.forEach((params:Params)=>{
      let id = params['reserve'];
      //this.album.artist = id;
      this._reserveService.getReserves(this.token).subscribe(
        response=>{
          if(!response['reserves']){
            this.alertMessage = 'Error en el servidor' ;
            //this._router.navigate(['/']);
          }else{
            this.reserves = response['reserves'];
            console.log(this.reserves);
          }


        },
        error =>{
          var errorMensaje = <any>error;
          if(errorMensaje != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );

    });


  }

  onCancelReserve(){

  }

  fileSaveEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}



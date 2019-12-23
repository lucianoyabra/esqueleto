import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WebsocketService } from './socket/websocket.service';
import { MessageService } from './services/message.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService, MessageService]

})
export class AppComponent implements OnInit {
  public title = 'resto';
  public user: User;
  public userLogIn: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;
  public mostrarWeb = false;
  public http: HttpClient;
  public email : string;
  public name : string;
  public message : string;
  public endpoint : string;

  constructor(private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private webSocketService: WebsocketService,
    private _messageService: MessageService)
    {
    this.user =  new User('','','','','','ROLE_USER','');
    this.user_register =  new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('entro al oninit de app.component');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);

    if(this.token){
      document.getElementById('web').setAttribute('style', 'display:none');
      document.getElementById('mu-header-footer').setAttribute('style', 'display:block');
      this.mostrarWeb = true;
    }

    //LISTEN WEBSOCKET EVENT

    this.webSocketService.listen('message').subscribe((data) => {
      console.log(data);
    });
   }

  public contactForm(form) {
    this._messageService.sendMessage(form).subscribe(
      response => {
        console.log('ahi va la Response:' + response['message']);
      }, error => {
        console.log('ahi va el Error:' + error[0]);
    });
  }

  public mostrarOcultar(){

    if (this.mostrarWeb == false) {
      document.getElementById('web').setAttribute('style','display:none');
      document.getElementById('mu-header-footer').setAttribute('style','display:block');
      this.mostrarWeb = true;
    } else {
      document.getElementById('web').setAttribute('style','display:block');
      document.getElementById('mu-header-footer').setAttribute('style','display:none');
      this.mostrarWeb = false;
    }
  }

  public onSubmit3(){
    this._userService.try().subscribe(
      response => {
        let identity = response;
        console.log(identity);

      },error =>{
        console.log('error');
      });
  }

  public onSubmit(){

    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response['user'];
        this.identity = identity;

        if(!this.identity._id){
          alert('El usuario no ha sido correctamente identificado');
        }else{
          //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL USUARIO EN SESION
          localStorage.setItem('identity', JSON.stringify(identity));
           //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL USUARIO EN SESION
           this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response['token'];
              this.token = token;
              this.user_register = new User('','','','','','ROLE_USER','');

              if(this.token.lenght <= 0){
                alert('El token no se ha generado');
              }else{
                  //CREAR ELEMENTO EN EL LOCAL STORAGE PARA TENER AL token disponible
                  localStorage.setItem('token', token);
                  window.location.reload();

                  //document.getElementById('web').setAttribute('style','display:none');
                  //window.location.reload();
                  //console.log(token);
                  //console.log(identity);

              }

          }, error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(error);
            }
          });

        }

    }, error =>{
      var errorMensaje = <any>error;
      if(errorMensaje != null){
        var body = JSON.parse(error._body);
        this.errorMessage = body.message;
        console.log(error);
      }
    });
  }

  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
    window.location.reload();
  }

}

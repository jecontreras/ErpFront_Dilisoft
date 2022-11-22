import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { TokenAction, UserAction } from 'src/app/redux/app.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UsuariosService } from 'src/app/servicesComponent/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  data:any = {};
  disableSubmit:boolean = true;
  constructor(
    private _user: UsuariosService,
    private _store: Store<STORAGES>,
    private _authSrvice: AuthService,
    private _tools: ToolsService,
    private _router: Router,
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  Funtlogin(){
    let data:any = {
      usu_email: this.data.email,
      usu_clave: this.data.password
    };
    if(!this.disableSubmit) return false;
    this.disableSubmit = false;
    this._user.login( data ).subscribe(( res:any )=>{
      this.disableSubmit = true;
      if(res.success){
        this.populateStorage( res );
      }else{
        this._tools.presentToast("Error de sesión")
      }
    },(error)=>{ console.error(error);this.disableSubmit = true; this._tools.presentToast("Error de servidor")});
  }

  populateStorage( res ){
  //localStorage.setItem('user', JSON.stringify(res.data));
  let accion = new UserAction( res.data, 'post');
  this._store.dispatch(accion);
  accion = new TokenAction( { token: res.data.tokens }, 'post');
  this._store.dispatch( accion );
  this._router.navigate(['/dashboard']);
  this._tools.basicIcons({header: "Hola Bienvenido!", subheader: `Hola ${ res.data.usu_nombre } Que tengas un buen dia`});
  setTimeout(()=>{ 
    location.reload();
  }, 3000);
  }

}

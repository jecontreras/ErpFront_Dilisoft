import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('user/querys',query, 'post');
  }
  
  getOn(query:any){
    return this._model.querys('user/querysOn',query, 'post');
  }

  recuperacion(query:any){
    return this._model.querys('user/resetiar',query, 'post');
  }

  getInfo(query:any){
    return this._model.querys('user/infoUser',query, 'post');
  }

  darPuntos(query:any){
    return this._model.querys('user/guardarPunto',query, 'post');
  }
  
  getNivel(query:any){
    return this._model.querys('user/nivelUser',query, 'post');
  }

  cambioPass(query:any){
    return this._model.querys('user/cambioPass',query, 'post');
  }

  login(query:any){
    return this._model.querys('user/login',query, 'post');
  }

  create(query:any){
    return this._model.querys('user/register',query, 'post');
  }

  update(query:any){
    return this._model.querys('user/'+query.id, query, 'put');
  }
  
  delete(query:any){
    return this._model.querys('user/'+query.id, query, 'delete');
  }

  createSolicitud(query:any){
    return this._model.querys('solicitudes',query, 'post');
  }

  updateSolicitud(query:any){
    return this._model.querys('solicitudes/'+query.id, query, 'put');
  }
  
  deleteSolicitud(query:any){
    return this._model.querys('solicitudes/'+query.id, query, 'delete');
  }
  getRecaudo(query:any){
    return this._model.querys('platadistribuidor/querys',query, 'post');
  }
  getPerfiles(query:any){
    return this._model.querys('tblcategoriaperfil/querys',query, 'post');
  }
  olvidoPass(query:any){
    return this._model.querys('user/olvidopass',query, 'post');
  }
}

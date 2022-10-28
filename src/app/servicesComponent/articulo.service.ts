import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('articulos/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('articulos',query, 'post');
  }
  update(query:any){
    return this._model.querys('articulos/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('articulos/'+query.id, query, 'delete');
  }
  getTalla(query:any){
    return this._model.querys('articuloTalla/querys',query, 'post');
  }
  createTalla(query:any){
    return this._model.querys('articuloTalla',query, 'post');
  }
  updateTalla(query:any){
    return this._model.querys('articuloTalla/'+query.id, query, 'put');
  }
  deleteTalla(query:any){
    return this._model.querys('articuloTalla/'+query.id, query, 'delete');
  }
}

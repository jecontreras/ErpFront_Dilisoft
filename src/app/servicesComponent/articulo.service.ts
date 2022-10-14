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
}

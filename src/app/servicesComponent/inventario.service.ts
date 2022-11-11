import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('inventario/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('inventario',query, 'post');
  }
  update(query:any){
    return this._model.querys('inventario/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('inventario/'+query.id, query, 'delete');
  }
  detalle(query:any){
    return this._model.querys('inventario/detalle',query, 'post');
  }
}

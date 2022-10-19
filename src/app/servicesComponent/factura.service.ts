import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('factura/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('factura',query, 'post');
  }
  update(query:any){
    return this._model.querys('factura/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('factura/'+query.id, query, 'delete');
  }
}

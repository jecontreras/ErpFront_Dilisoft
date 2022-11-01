import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloLogService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('articuloLog/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('articuloLog',query, 'post');
  }
  update(query:any){
    return this._model.querys('articuloLog/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('articuloLog/'+query.id, query, 'delete');
  }

}

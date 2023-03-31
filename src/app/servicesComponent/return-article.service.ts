import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnArticleService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('returnActions/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('returnActions',query, 'post');
  }
  update(query:any){
    return this._model.querys('returnActions/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('returnActions/'+query.id, query, 'delete');
  }
}

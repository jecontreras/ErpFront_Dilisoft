import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('logs/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('logs',query, 'post');
  }
  update(query:any){
    return this._model.querys('logs/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('logs/'+query.id, query, 'delete');
  }
}

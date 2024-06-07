import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('provedor/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('provedor',query, 'post');
  }
  update(query:any){
    return this._model.querys('provedor/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('provedor/'+query.id, query, 'delete');
  }
}

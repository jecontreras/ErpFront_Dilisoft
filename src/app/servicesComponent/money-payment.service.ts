import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyPaymentService {


  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('moneypayments/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('moneypayments',query, 'post');
  }
  update(query:any){
    return this._model.querys('moneypayments/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('moneypayments/'+query.id, query, 'delete');
  }
}

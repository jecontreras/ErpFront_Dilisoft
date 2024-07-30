import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersWebService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('factura/listPedidosWeb',query, 'post');
  }
  getWebOrders(query:any){
    return this._model.querys('weborders/querys',query, 'post');
  }
}

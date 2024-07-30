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
    return this._model.querys('factura/getSimple',query, 'post');
  }
  getDetallado(query:any){ console.log("get detallado", query)
    return this._model.querys('factura/querys',query, 'post');
  }
  getDetail(query:any){
    return this._model.querys('factura/getDetail',query, 'post');
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
  acentandoFct(query:any){
    return this._model.querys('factura/asentarFactura',query, 'post');
  }
  getStatistics(query:any){
    return this._model.querys('factura/statisticsBill',query, 'post');
  }
  getstatisticsBillPlatform(query:any){
    return this._model.querys('factura/statisticsBillPlatform',query, 'post');
  }
  statisticsBillPlatformReturn(query:any){
    return this._model.querys('factura/statisticsBillPlatformReturn',query, 'post');
  }
  statisticsBillPlatformWarranty(query:any){
    return this._model.querys('factura/statisticsBillPlatformWarranty',query, 'post');
  }
  articleNextExpire(query:any){
    return this._model.querys('factura/articleNextExpire',query, 'post');
  }
  articleNextFurther(query:any){
    return this._model.querys('factura/articleNextFurther',query, 'post');
  }
  articleAmounts(query:any){
    return this._model.querys('factura/articleAmounts',query, 'post');
  }
  createOrdenAutomatico(query:any){
    return this._model.querys('factura/createPedidosWeb',query, 'post');
  }
}

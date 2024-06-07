import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import * as moment from 'moment';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Factura",
    returnHTML: "formfactura/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0,
        entrada: 1,
        fecha: moment().format("YYYY-MM-DD")
      },
      limit: 10
    },
    btn:{
      btnCrear: {
        titulo: "Crear Factura",
        click: "CrearFactura()"
      }
    },
    tablet:{
      headers:["Select","Fecha","Dias de vencimiento","Monto","Entrada","Provedor","Acentada","Cantidad de pares"],
      row:[],
      keys: ["select","fecha",'expiration', "monto", "entrada","provedor","asentado", "itemPeers"]
    }
  };
  constructor(
    private _router: Router,
    private _factura: FacturaService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._factura;
  }

  CrearFactura(){
    this._router.navigate(['/formfactura']);
  }

}

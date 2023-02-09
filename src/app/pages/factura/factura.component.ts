import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/servicesComponent/factura.service';

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
        estado: 0
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
      headers:["Select","Codigo","Cliente","Fecha","Monto","Entrada","Provedor","Acentada","Actualizado"],
      row:[],
      keys: ["select","codigo","nombreCliente","fecha", "monto", "entrada","provedor","asentado","updatedAt"]
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

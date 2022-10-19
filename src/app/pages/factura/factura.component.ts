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
    returnHTML: "formarticulo/",
    model: "",
    btn:{
      btnCrear: {
        titulo: "Crear Factura",
        click: "CrearFactura()"
      }
    },
    tablet:{
      headers:["Codigo","Fecha","Monto","Entrada","Provedor","Creado","Actualizado"],
      row:[],
      keys: ["codigo", "imagen", "monto", "entrada","provedor","creado","actualizado"]
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

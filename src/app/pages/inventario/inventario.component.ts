import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Articulos",
    returnHTML: "formarticulo/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Articulo",
        click: "Crearinventario()"
      }
    },
    tablet:{
      headers:["Titulo","Fecha","Fecha de empalme","Descripcion","Creado","Actualizado"],
      row:[],
      keys: ["titulo", "fecha", "fechaEmpalme", "descripcion","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _inventario: InventarioService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._inventario;
  }

  Crearinventario(){
    this._router.navigate(['/formInventario']);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {
  _dataConfig:any = {
    titulo: "Lista de Articulos",
    returnHTML: "formarticulo/",
    model: "",
    dsAccion: true,
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Articulo",
        click: "CrearArticulo()"
      }
    },
    tablet:{
      headers:["Codigo","Imagen","Titulo","Cantidad","categoria","Creado","Actualizado"],
      row:[],
      keys: ["codigo", "imagen", "titulo", "cantidad","categoria","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _Articulo: ArticuloService,
  ) {
    this._dataConfig.model = _Articulo;
   }

  ngOnInit(): void {
    
  }

  CrearArticulo(){
    this._router.navigate(['/formarticulo']);
  }

  printCodigo(){
    this._router.navigate(['/codigoprint']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicesComponent/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  _dataConfig:any = {
    titulo: "Lista de Categoria",
    returnHTML: "formcategoria/",
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Categoria",
        click: "CrearCategoria()"
      }
    },
    tablet:{
      headers:["titulo","Imagen","Descripcion","Creado","Actualizado"],
      row:[],
      keys: ["titulo", "imagen", "descripcion","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _categoria: CategoriaService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._categoria;
  }

  CrearCategoria(){
    this._router.navigate(['/formcategoria']);
  }

}

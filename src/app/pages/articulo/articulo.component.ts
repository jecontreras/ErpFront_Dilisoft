import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {
  _dataConfig:any = {
    titulo: "Lista de Articulos",
    btn:{
      btnCrear: {
        titulo: "Crear Articulo",
        click: "CrearArticulo()"
      }
    },
    tablet:{
      headers:["Codigo","Imagen","Titulo","Cantidad","categoria","Creado","Actualizado"],
      row:[
        {
          codigo:"12312",
          imagen: "../assets/img/theme/bootstrap.jpg",
          titulo: "Hola pruebas",
          cantidad: 12312,
          categoria: "CALZADO",
          creado: "2022/10/11",
          actualizado: "2022/10/11"
        }
      ],
      keys: ["codigo", "imagen", "titulo", "cantidad","categoria","creado","actualizado"]
    }
  };
  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  CrearArticulo(){
    this._router.navigate(['/formarticulo']);
  }

}

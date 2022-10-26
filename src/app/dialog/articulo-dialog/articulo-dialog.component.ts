import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

@Component({
  selector: 'app-articulo-dialog',
  templateUrl: './articulo-dialog.component.html',
  styleUrls: ['./articulo-dialog.component.scss']
})
export class ArticuloDialogComponent implements OnInit {
  
  tablet:any = {
    headers:["Codigo", "Titulo", "Color", "Talla", "Cantidad"],
    row:[],
    keys:["codigo", "titulo","color","talla","cantidad"]
  };
  querys:any = {
    where:{
      estado:0
    },
    page:0,
    limit: 10000
  };
  datoBusqueda:string;

  constructor(
    private _tools: ToolsService,
    private _articulos: ArticuloService,
  ) { }

  ngOnInit(): void {
    this.filtroGet();
  }

  filtroGet(){
    this.querys.where.or = [
      {
        slug: {
          contains: this.datoBusqueda|| ''
        }
      },
      {
        codigo: {
          contains: this.datoBusqueda|| ''
        }
      },
      {
        titulo: {
          contains: this.datoBusqueda|| ''
        }
      }
    ];
    this.getArticulos();
  }
  getArticulos(){
    this.tablet.row = [];
    this._articulos.get( this.querys ).subscribe( ( res:any )=>{
      res = res.data;
      this.tablet.row = res;
      this.datoBusqueda = "";
    });
  }

  selectColor( item ){
    console.log("****", item )
    item.listTalla = item.listColor.find( ( row:any )=> row.id == item.selectColor );
    try {
      item.listTalla = item.listTalla.listTalla;
    } catch (error) { item.listTalla = []; }
  }

}

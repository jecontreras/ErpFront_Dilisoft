import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import * as _ from 'lodash';

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
  listSelecciono:any = [];

  constructor(
    private _tools: ToolsService,
    private _articulos: ArticuloService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArticuloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) { }

  ngOnInit(): void {
    console.log( this.datas.datos )
  }

  filtroGet(){
    this.querys.where.or = [
      {
        codigo: {
          contains: this.datoBusqueda|| ''
        }
      }
    ];
    this.getArticulosTalla();
  }
  getArticulosTalla(){
    this._articulos.getTalla( this.querys ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) { this.datoBusqueda = ""; return this._tools.basic("No se encontro producto!!!") }
      this.getArticulos( res );
    });
  }
  getArticulos( ids:any ){
    this.tablet.row = [];
    this._articulos.get( { where: { id: ids.articulo } } ).subscribe( ( res:any )=>{
      res = res.data;
      this.tablet.row = res;
      this.datoBusqueda = "";
      for( let row of this.tablet.row ) {
        row.selectColor = ids.listColor;
        row.selectTalla = ids.id;
        row.cantidadSelect = 1;
        this.selectColor( row );
        this.checkseleccionado( row );
      }
    });
  }

  selectColor( item ){
    console.log("****", item )
    item.listTalla = item.listColor.find( ( row:any )=> row.id == item.selectColor );
    try {
      item.listTalla = item.listTalla.listTalla;
    } catch (error) { item.listTalla = []; }
  }
  checkseleccionado( item ){
     console.log( item );
     item.check = !item.check;
     this.listSelecciono.push( item );
     //this.listSelecciono = _.unionBy(this.listSelecciono || [], this.listSelecciono, 'id');
  }

  seleccionado(){
    this.close();
  }

  close(){
    this.dialogRef.close(this.listSelecciono);
  }

}

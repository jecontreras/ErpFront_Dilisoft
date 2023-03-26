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
    headers:["Codigo", "Color", "Talla","Existencia", "Cantidad", "Opciones"],
    row:[],
    keys:["codigo","nameColor","nameTalla","existencia","cantidad"]
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
  dataSource:any = {};
  constructor(
    private _tools: ToolsService,
    private _articulos: ArticuloService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArticuloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ) { }

  ngOnInit(): void {
    this.dataSource = this.datas.datos || [];
    console.log( this.datas.datos )
  }

  filtroGet(){
    this.querys.where.codigo = this.datoBusqueda;
    /*this.querys.where.or = [
      {
        codigo: {
          contains: this.datoBusqueda|| ''
        }
      }
    ];*/
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
    this._articulos.get( { where: { id: ids.articulo.id } } ).subscribe( async ( res:any )=>{
      res = res.data;
      this.tablet.row = res;
      this.datoBusqueda = "";
      for( let row of this.tablet.row ) {
        row.selectColor = ids.listColor.id;
        row.selectTalla = ids.id;
        row.nameTalla = ids.talla;
        row.nameColor = ids.listColor.color;
        row.existencia = ids.cantidad;
        row.articuloTalla = ids;
        row.articuloColor = ids.listColor;
        this.selectColor( row );
        const result: { value?:string; } = await this._tools.alertInput( { title: "Cantidad Seleccionar" } );
        row.cantidadSelect = Number( result.value || 1 );
        if( result.value ) this.checkseleccionado( row );
        console.log("****RESULT", row, "74",ids );
        this.handleAmount( row );
      }
    });
  }

  handleAmount( item ){
    if( this.dataSource.entrada == 1 ) if( item.cantidadSelect > item.existencia ) return this._tools.basic("Alerta!! cantidad requerida no disponible..");
  }

  selectColor( item ){
    //console.log("****", item )
    item.listTalla = item.listColor.find( ( row:any )=> row.id == item.selectColor );
    try {
      item.listTalla = item.listTalla.listTalla;
    } catch (error) { item.listTalla = []; }
  }
  checkseleccionado( item ){
     if( !item.cantidadSelect ) return this._tools.basic("Alerta!! Por favor ingresar cantidad a desear..");
     item.check = !item.check;
     this.listSelecciono.push( { ..._.clone( item ), idl: this._tools.codigo()} );
     //this.listSelecciono = _.unionBy(this.listSelecciono || [], this.listSelecciono, 'id');
  }

  seleccionado(){
    this.close();
  }
  async handleDrop( item ){
    let confirm = await this._tools.confirm( {title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if(!confirm.value) return false;
    this.listSelecciono = this.listSelecciono.filter( row => row.idl !== item.idl );
  }

  close(){
    this.dialogRef.close(this.listSelecciono);
  }

}

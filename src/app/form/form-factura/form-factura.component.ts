import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloDialogComponent } from 'src/app/dialog/articulo-dialog/articulo-dialog.component';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.scss']
})
export class FormFacturaComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
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
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _factura: FacturaService,
    private _articulos: ArticuloService,
    public dialog: MatDialog,
  ) { 
    document.addEventListener("DOMContentLoaded", () => {
      
      const $codigo:any = document.querySelector("#codigo");
      $codigo.addEventListener("keydown", ( evento:any ) => {
          if (evento.keyCode === 13) {
              // El lector ya terminó de leer
              const codigoDeBarras = $codigo.value;
              // Aquí ya podemos hacer algo con el código. Yo solo lo imprimiré
              console.log("Tenemos un código de barras:");
              console.log(codigoDeBarras);
              // Limpiar el campo
              $codigo.value = "";
          }
      });
    });
  }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    else {
      this.data = {
        codigo: this._tools.codigo(),
        fecha: moment().format("DD/MM/YYYY"),
        entrada: 0
      };
    }
    console.log(this.data)
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._factura.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
    });
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

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._factura.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._factura.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
    });
  }

  openArticulo(obj:any){
    const dialogRef = this.dialog.open(ArticuloDialogComponent,{
      data: {datos: obj || {}}
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

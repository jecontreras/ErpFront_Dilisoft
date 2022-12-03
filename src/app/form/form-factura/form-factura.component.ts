import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloDialogComponent } from 'src/app/dialog/articulo-dialog/articulo-dialog.component';
import * as _ from 'lodash';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';
import { USER } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.scss']
})
export class FormFacturaComponent implements OnInit {

  data:any = {
    tipoFactura: 1,
  };
  id:any;
  titleBTN:string = "Guardar";
  tablet:any = {
    headers:["Codigo", "Titulo", "Color", "Talla", "Cantidad", "Precio Unitario", "Precio Total"],
    row:[],
    keys:["codigo", "titulo","color","talla","cantidad", "precioClienteDrop", "precioTotal"]
  };
  querys:any = {
    where:{
      estado:0
    },
    page:0,
    limit: 10000
  };
  datoBusqueda:string;
  opcionCurrencys:any;
  listProvedor:any = [];
  dataUser:any = {};

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _factura: FacturaService,
    private _articulos: ArticuloService,
    public dialog: MatDialog,
    private _provedor: ProvedorService,
    private _store: Store<USER>,
    private _router: Router,
  ) { 

    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });

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
    this.opcionCurrencys = this._tools.currency;
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    else {
      this.data = {
        codigo: this._tools.codigo(),
        fecha: moment().format("DD/MM/YYYY"),
        entrada: 1,
        tipoFactura: 1
      };
    }
    console.log(this.data)
    this.getProvedor();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._factura.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      //console.log( this.data )
      this.tablet.row = _.map( this.data.listFacturaArticulo, ( row )=>{
        let data:any = {
          id: row.id,
          articulo: row.articulo.id,
          selectTalla: row.articuloTalla.id,
          selectColor: row.articuloColor.id,
          codigo: row.articulo.codigo,
          titulo: row.articulo.titulo,
          cantidad: row.cantidad,
          cantidadSelect: row.cantidad,
          listColor: row.articulo.listColor,
          precioClienteDrop: row.articulo.precioClienteDrop,
          precioCompra: row.precio,
          ...row
        };
        let filtro = data.listColor.find( ( keys:any ) => keys.id == row.articuloColor.id );
        console.log( filtro, data )
        this.selectColor( data );
        return data;
      } );
       try { this.data.provedor = this.data.provedor.id; } catch (error) {}
      this.suma();
    });
  }

  getProvedor(){
    this._provedor.get( { where: { estado: 0 } } ).subscribe(( res:any )=>{
      this.listProvedor = res.data;
    });
  }

  selectColor( item ){
    //console.log("****", item )
    item.listTalla = item.listColor.find( ( row:any )=> row.id == item.selectColor );
    try {
      item.listTalla = item.listTalla.listTalla;
    } catch (error) { item.listTalla = []; }
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  async updateFun(){
    return new Promise( resolve =>{
      let data:any = {
        listArticulo: _.map(this.tablet.row, ( item:any )=>{
          let data:any = {
            estado: 3,
            articulo: item.id,
            articuloTalla: item.selectTalla,
            articuloColor: item.selectColor,
            cantidad: item.cantidadSelect,
            ...item
          };
          if( this.data.entrada == 1 && this.data.tipoFactura == 1) data.precio = item.precioClienteDrop;
          if( this.data.entrada == 1 && this.data.tipoFactura == 0) data.precio = item.precioOtras;
          if( this.data.entrada == 0 ) data.precio = item.precioCompra;
          return data
        }),
        ...this.data
      }
      this._factura.update( data ).subscribe(( res:any )=>{
        this._tools.basic("Actualizado exitoso");
        resolve( true );
      },( )=> { resolve( false ); } );
    });
  }
  crearFun(){
    this.data.user = this.dataUser.id;
    let data:any = {
      factura: this.data,
      listArticulo: _.map(this.tablet.row, ( item:any )=>{
        let data:any = {
          estado: 3,
          articulo: item.id,
          articuloTalla: item.selectTalla,
          articuloColor: item.selectColor,
          cantidad: item.cantidadSelect,
          ...item
        };
        if( this.data.entrada == 1 && this.data.tipoFactura == 1) data.precio = item.precioClienteDrop;
        if( this.data.entrada == 1 && this.data.tipoFactura == 0) data.precio = item.precioOtras;
        if( this.data.entrada == 0 ) data.precio = item.precioCompra;
        return data
      }),
    }
    this._factura.create( data ).subscribe(( res:any )=>{
      console.log("*****", res)
      if( res.status == 400 ) return this._tools.basic("Problemas!! Volver a intentar");
      res = res.data || {};
      this.id = res.id;
      this.data.id = this.id;
      this._tools.basic("Creado exitoso");
      this.titleBTN= "Actualizar";
      this._router.navigate(['/formfactura', this.id ] );
    });
  }

  async acentarFactura(){
    if( !this.id ) return false;
    let result:any = await this.updateFun();
    if( !result ) return this._tools.basic("Tenemos problemas !Volver a intentarlo");
    
    let data:any = {
      id: this.id,
      asentado: true
    };
    this._factura.acentandoFct( data ).subscribe( ( res:any )=>{
      if( res.status == 400 ) {
        let txt = res.data;
        if( res.data[0] ){
          txt = "";
          for( let row of res.data ){
            txt+= row.data;
          }
        }
        return this._tools.basic( txt );
      }
      this.data.asentado = true;
      this._tools.basic( res.data );
      //this.print();
    });
  }

  openArticulo(obj:any){
    const dialogRef = this.dialog.open(ArticuloDialogComponent,{
      data: {datos: obj || {}}
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
      this.tablet.row = result || [];
      this.suma();
    });
  }

  checkseleccionado( item:any, idx:any ){
    item.check = !item.check;
    //this.tablet.row = _.filter( this.tablet.row, ( key:any ) => key.selectTalla == item.selectTalla );
    console.log( item, this.tablet.row, idx );
    this.tablet.row.splice( idx, 1 );
    this._tools.basic("Borrado exitoso")
    this.suma();
 }

 reloadValidacion(){
  if( this.data.entrada == 0 ) this.data.tipoFactura == 5;
 }

 suma(){
  this.data.monto = 0;
  for( let row of this.tablet.row ){
    if( ( !row.precioTotal )  || ( this.data.entrada != 2 ) || ( this.data.entrada != 3 ) ) row.precioTotal = 0;
    console.log( row, this.data );
    if( this.data.entrada == 0  ) row.precioTotal= row.precioCompra * ( row.cantidadSelect || 0 ) ;

    if( this.data.entrada == 1 && this.data.tipoFactura == 0) row.precioTotal= row.precioOtras * ( row.cantidadSelect || 0 ) ;

    if( this.data.entrada == 1 && this.data.tipoFactura == 1) row.precioTotal= row.precioClienteDrop * ( row.cantidadSelect || 0 ) ;
    
    if( ( this.data.entrada != 2 ) || ( this.data.entrada != 3 ) ) this.data.monto+= row.precioTotal;

  }
 }

 print(){
  //window.print();
  console.log("**print")
  /*let printContents = document.getElementById("component1").innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;*/

  window.print();

  //document.body.innerHTML = originalContents;
}

}

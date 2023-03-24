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
    headers:["Codigo", "Color", "Talla", "Existencia", "Cantidad", "Precio Unitario", "Precio Total"],
    row:[],
    keys:["codigo","color","talla",'existencia',"cantidad", "precioClienteDrop", "precioTotal"]
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
  dv:any = {};
  disabledPrint:boolean = false;
  btnDisabled:boolean = false;
  listSummary:{ codigo:string; color:string; cantidad: number; }[] = [];
  viewDisabled:boolean = true;

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
    //console.log("***", this.activate.snapshot.paramMap.get('print'))
    if( this.id ) { this.titleBTN = "Actualizar"; this.getData( this.id, 'view' );}
    else {
      this.data = {
        codigo: this._tools.codigo(),
        fecha: moment().format("YYYY-MM-DD"),
        entrada: 1,
        tipoFactura: 1
      };
    }
    console.log(this.data, window.location.href)
    this.getProvedor();
  }

  getData( id:string, opt:string ){
    this._factura.getDetallado( { where: { id: id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( opt == 'view') {
        this.data = res || {};
        try { this.data.provedor = this.data.provedor.id; } catch (error) {}
      }else this.data.tipoFactura = res.tipoFactura;
      //console.log( this.data )
      this.tablet.row = _.map( res.listFacturaArticulo, ( row )=>{
        let data:any = {
          id: row.id,
          articulo: row.articulo.id,
          selectTalla: row.articuloTalla.id,
          nameTalla: row.articuloTalla.talla,
          selectColor: row.articuloColor.id,
          nameColor: row.articuloColor.color,
          codigo: row.articulo.codigo,
          titulo: row.articulo.titulo,
          cantidad: row.cantidad,
          cantidadSelect: row.cantidad,
          listColor: row.articulo.listColor,
          precioClienteDrop: row.precio,
          precioShipping: row.precio,
          precioOtras: row.precio,
          precioLokompro: row.precio,
          precioArley: row.precioArley,
          precioCompra: row.precio,
          eliminado: false,
          ...row
        };
        let filtro = data.listColor.find( ( keys:any ) => keys.id == row.articuloColor.id );
        this.selectColor( data );
        return data;
      } );
      this.suma();
      setTimeout(()=>{
        //if( this.activate.snapshot.paramMap.get('print') ) this.print();
      }, 3000)
    });
  }

  getcdFactura(){
    this._factura.get( { where: { codigo: this.data.cdFactura, asentado:true } } ).subscribe(( res )=>{
      res = res.data[0];
      this.dv = {};
      if( !res ) return this._tools.basic("No se encontro la factura");
      this._tools.basic("Factura encontrada!");
      this.dv = res;
      this.getData( this.dv.id,'dev' );
    })
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

  async submit(){
    if( this.btnDisabled ) return true;
    this.btnDisabled = true;
    if( this.id ) await this.updateFun();
    else {
      const validate = this.validateInput();
      if( validate ) await this.crearFun();
    }
    this.btnDisabled = false;
    //setTimeout( ()=> location.reload(), 3000 );
  }

  async updateFun(){
    return new Promise( resolve =>{
      try {
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
            if( this.data.entrada == 1 && this.data.tipoFactura == 4) data.precio = item.precioArley;
            if( this.data.entrada == 1 && this.data.tipoFactura == 3) data.precio = item.precioLokompro;
            if( this.data.entrada == 1 && this.data.tipoFactura == 2) data.precio = item.precioShipping;
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
      } catch (error) {
        resolve( false );
      }
    });
  }
  crearFun(){
    return new Promise( resolve =>{
      try {
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
            if( this.data.entrada == 1 && this.data.tipoFactura == 4) data.precio = item.precioArley;
            if( this.data.entrada == 1 && this.data.tipoFactura == 3) data.precio = item.precioLokompro;
            if( this.data.entrada == 1 && this.data.tipoFactura == 2) data.precio = item.precioShipping;
            if( this.data.entrada == 1 && this.data.tipoFactura == 1) data.precio = item.precioClienteDrop;
            if( this.data.entrada == 1 && this.data.tipoFactura == 0) data.precio = item.precioOtras;
            if( this.data.entrada == 0 ) data.precio = item.precioCompra;
            return data
          }),
        }
        this._factura.create( data ).subscribe(( res:any )=>{
          console.log("*****", res)
          if( res.status == 400 ) { resolve( false ); return this._tools.basic("Problemas!! Volver a intentar");}
          res = res.data || {};
          this.id = res.id;
          this.data.id = this.id;
          this._tools.basic("Creado exitoso");
          this.titleBTN= "Actualizar";
          this._router.navigate(['/formfactura', this.id ] );
          resolve( true );
        },( )=>resolve( false ) );
      } catch (error) {
        resolve( false );
      }
    })
  }

  validateInput(){
    if( !this.data.codigo ) {this._tools.basic("Por favor ingresar Campo de codigo"); return false; }
    if( !this.data.fecha ) { this._tools.basic("Por favor ingresar Campo de fecha"); return false;}
    if( this.data.entrada == 1 ) if( !this.data.tipoFactura ) { this._tools.basic("Por favor ingresar Campo de tipoFactura"); return false; }
    if( this.data.entrada == 0 ) {
      if( !this.data.expiration ) { this._tools.basic("Por favor ingresar Campo de fecha de vencimiento"); return false; }
      if( !this.data.provedor ) { this._tools.basic("Por favor ingresar Campo de codigo"); return false; }
    }
    if( !this.data.codigo ) { this._tools.basic("Por favor ingresar Campo de codigo"); return false; }
    return true;
  }

  async acentarFactura(){
    if( this.btnDisabled ) return false;
    if( !this.id ) return false;
    this.btnDisabled = true;
    let result:any = await this.updateFun();
    if( !result ) { this.btnDisabled = false; return this._tools.basic("Tenemos problemas !Volver a intentarlo");}

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
      this.btnDisabled = false;
      //this.print();
    },()=>this.btnDisabled = false);
  }

  openArticulo(obj:any){
    const dialogRef = this.dialog.open(ArticuloDialogComponent,{
      width: "50%",
      height: "800px",
      data: {datos: obj || {}}
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
      const format= [];
      for( const item of result ) {
        format.push( {
          ... item,
          eliminado: false,
          articulo: item.id,
          id: ""
         })
      }
      this.tablet.row.push( ...( format || [] ) );
      this.suma();
    });
  }

  async checkseleccionado( item:any, idx:any ){
    let confirm = await this._tools.confirm( {title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if(!confirm.value) return false;
    item.check = !item.check;
    //this.tablet.row = _.filter( this.tablet.row, ( key:any ) => key.selectTalla == item.selectTalla );
    if( item.id ){
      item.eliminado = true;
    }else this.tablet.row.splice( idx, 1 );
    this._tools.basic("Borrado exitoso")
    this.suma();
 }

 reloadValidacion(){
  if( this.data.entrada == 0 ) this.data.tipoFactura == 5;
  if( this.data.entrada == 1 ) delete this.data.provedor;
 }

 suma(){
  this.data.monto = 0;
  this.data.cantidadPares = 0;
  let dataFinix:any = [];
  for( let row of this.tablet.row ){
    //console.log("***334", row)
    if( row.eliminado == false ){
      this.data.cantidadPares+= row.cantidadSelect
      if( ( !row.precioTotal ) || ( this.data.entrada != 3 ) ) row.precioTotal = 0;
      if( this.data.entrada == 0  ) row.precioTotal= row.precioCompra * ( Number( row.cantidadSelect ) || 0 ) ;

      if( ( this.data.entrada == 1 || this.data.entrada == 2 ) && this.data.tipoFactura == 0) row.precioTotal= row.precioOtras * ( Number( row.cantidadSelect ) || 0 ) ;

      if( ( this.data.entrada == 1 || this.data.entrada == 2 ) && this.data.tipoFactura == 1) row.precioTotal= row.precioClienteDrop * ( Number( row.cantidadSelect ) || 0 ) ;
      if( ( this.data.entrada == 1 || this.data.entrada == 2 ) && this.data.tipoFactura == 2) row.precioTotal= row.precioShipping * ( Number( row.cantidadSelect ) || 0 ) ;
      if( ( this.data.entrada == 1 || this.data.entrada == 2 ) && this.data.tipoFactura == 3) row.precioTotal= row.precioLokompro * ( Number( row.cantidadSelect ) || 0 ) ;
      if( ( this.data.entrada == 1 || this.data.entrada == 2 ) && this.data.tipoFactura == 4) row.precioTotal= row.precioArley * ( Number( row.cantidadSelect ) || 0 ) ;

      if( ( this.data.entrada != 2 ) || ( this.data.entrada != 3 ) ) this.data.monto+= row.precioTotal;

      let index = _.findIndex( dataFinix, ['codigo', row.articuloTalla.codigo] );
      if( index >= 0 ) dataFinix[ index ] = dataFinix[ index ].cantidad = row.cantidadSelect;
      else dataFinix.push( { codigo: row.articuloTalla.codigo, cantidad: row.cantidadSelect, color: row.articuloColor.color });
    }

  }
  this.listSummary = dataFinix;
  //console.log("*****357", this.listSummary)
 }

 handleActivateMenu(){
  this.viewDisabled = !this.viewDisabled;
}

 openPrint(){
  //window.open( window.location.href+"/print" );
  this.disabledPrint = true;
  setTimeout(()=>{
    this._tools.print();
    setTimeout(()=> this.disabledPrint = false, 3000);
  }, 2000 );

 }

 print(){
  //window.print();
  console.log("**print")
  let printContents = document.getElementById("component1").innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  //document.body.innerHTML = originalContents;
}

}

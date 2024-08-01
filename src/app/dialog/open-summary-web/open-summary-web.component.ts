import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArticuloDialogComponent } from '../articulo-dialog/articulo-dialog.component';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
import * as moment from 'moment';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

interface Transaction {
  nameRef:string;
  nameColor: string;
  pd_tallas: string;
  cantidadT: number;
}

@Component({
  selector: 'app-open-summary-web',
  templateUrl: './open-summary-web.component.html',
  styleUrls: ['./open-summary-web.component.scss']
})
export class OpenSummaryWebComponent implements OnInit {
  listSummary: Transaction[] = [];
  displayedColumns: string[] = ['nameRef', 'nameColorSigla','nameColor', 'pd_tallas', 'cantidadT', 'price'];
  transactions: Transaction[] = [];
  sumCantidad:number = 0;
  dataUser:any = {};
  sumaPrice = 0;
  btnSearhCode:boolean = false;
  btnErrorT:boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArticuloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private _tools: ToolsService,
    private _store: Store<USER>,
    private _factura: FacturaService,
    private _articulo: ArticuloService
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit(): void {
    //this.listSummary = this.processSum( );
    this.transactions = this.listSummary;
    this.handleProceesArticle();
    console.log("*****19", this.datas, this.listSummary, this.transactions )
  }

  getTotalCost() {
    return this.transactions.map(t => t.cantidadT).reduce((acc, value) => acc + value, 0);
  }

  processSum(){
    let dataEnd = Array();
    this.sumCantidad = 0;
    for( let row of this.datas ){
      for( let summary of row.resumenArticle ) {
        let findIndex = dataEnd.findIndex( item => item.pd_ref_id === summary.pd_ref_id && item.pd_color_id === summary.pd_color_id && item.pd_tallas === summary.pd_tallas );
        if( findIndex >= 0 ){
          dataEnd[ findIndex ].cantidadT+= summary.cantidad;
        }else{
          summary.cantidadT = summary.cantidad;
          dataEnd.push( summary );
        }
      }
    }
    dataEnd = _.orderBy(dataEnd, ['nameRef'], ['asc']);
    this.sumCantidad = _.sumBy(dataEnd, 'cantidadT');
    return dataEnd;
  }

  printArticulo(){
    setTimeout(()=>{
      this._tools.print();
    }, 2000 );
  }
  btnDisableCreate:boolean = false;
  handleGenerateF(){
    if( this.btnDisableCreate ) return true;
    this.btnDisableCreate = true;
    let txtJson = _.map( this.datas, 'orders') ;
    let txt = String();
    for( let row of txtJson ) txt+=","+row;
    let data = {
      listArticulo: this.handleProceesArticle(),
      factura: {
        codigo: this._tools.codigo(),
        fecha: moment().format("YYYY-MM-DD"),
        entrada: 1,
        tipoFactura: 1,
        devolucion: 0,
        nombreCliente: "Creacion Automatica",
        monto: this.sumaPrice,
        cantidadPares: this.sumCantidad,
        user: this.dataUser.id,
        descripcion: "Creacion de factura automatica # "+ txt
      }
    };
    this._factura.createOrdenAutomatico( data ).subscribe(( res:any )=>{
      console.log("*****", res)
      this.btnDisableCreate = false;
      if( res.status == 400 ) { return this._tools.basic("Problemas!! Volver a intentar");}
      this._tools.basic("Éxito si se cargaron facturas automáticas.");
      this.close( true );
    }, ()=> { this.btnDisableCreate = false; this._tools.basic("Problemas!! Volver a intentar"); } );
  }

  handleProceesArticle(){
    let endData = Array();
    this.btnErrorT = false;
    for( let row of this.datas ) for( let item of row.listArticle ) {
      endData.push( { ...item, precio: Number( item.precio ), idWebOr: row.id } );
      this.sumaPrice+= Number( item.precio );
      this.sumCantidad+= item.cantidad;
      if( item.articuloTalla === false ) this.btnErrorT = true;
    }
    return endData;
  }

  async handleChangetGetCode( row ){
    if( this.btnSearhCode ) return false;
    this.btnSearhCode = true;
    let articleTalla:any = await this.getProcessArticle( `${ row.articulocolorsigla }${ row.articulocodigo }-${ row.articulotalla }` )
    if( !articleTalla ) return this._tools.basic("No puedo hallar el código para buscar de nuevo.");
    row.articuloTalla = articleTalla.id;
    row.articuloColor = articleTalla.listColor;
    this.btnSearhCode = false;
    this._tools.basic("Codigo encontrado.");
    this.handleProceesArticle();
  }

  getProcessArticle( code ){
    return new Promise( resolve =>{
      this._articulo.getTalla( { where: { codigo: code, estado: 0 } } ).subscribe( res => {
        resolve( res.data[0] );
      });
    });
  }

  close( opt:boolean = false ){
    this.dialogRef.close( opt );
  }

}

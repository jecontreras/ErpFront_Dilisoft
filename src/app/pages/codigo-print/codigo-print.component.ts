import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import * as _ from 'lodash';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckCodePrintComponent } from 'src/app/dialog/check-code-print/check-code-print.component';
@Component({
  selector: 'app-codigo-print',
  templateUrl: './codigo-print.component.html',
  styleUrls: ['./codigo-print.component.scss']
})
export class CodigoPrintComponent implements OnInit {

  listArtiuclos:any = [];
  vista:string = "inicial";
  listSeleccionado:any = [];
  lisArticles = [];
  listSelectCheck = [];
  listVendor = {};
  constructor(
    private _articulos: ArticuloService,
    private _tools: ToolsService,
    private _provedor: ProvedorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //this.getArticulos();
    this.getArticles();
    this.getVendor();
  }

  getArticles(){
    this._articulos.get( { where:{estado: 0 }, limit: 1000000 } ).subscribe(( res )=>{
      this.lisArticles= res.data;
    });
  }

  nextCheck(){
    this.listSelectCheck= this.lisArticles.filter(( item )=> item.check == true );
    this.vista = 'two';
    const id = _.map( this.listSelectCheck, 'id' );
    this.getArticulos( id);
  }

  getArticulos( id ){
    this._articulos.getTalla( { where: { articulo: id, estado: 0 }, limit: 100000 } ).subscribe( ( res:any )=>{
      this.listArtiuclos = res.data;
    });
  }


  close(){

  }

  print(){
    this._tools.print();
    return false;
    //window.print();
    let printContents = document.getElementById("component1").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  getVendor(){
    this._provedor.get( { where:{ estado: 0 }, limit: 1000 }).subscribe(( res )=>{
      for(const item of res.data ){
        this.listVendor[item.titulo] = item.titulo;
      }
      //console.log( this.listVendor)
    });
  }

  async printCodigo( row:any ){
    let result:any = await this._tools.alertInput( {
      title: "Cantidad de Etiquetas a imprimir",
      input: "number"
    });
    //console.log( result );
    result = Number( result.value );
    let vendor:any = await this._tools.alertInputSelect({ title: 'Provedor', list: this.listVendor });
    //console.log( vendor );
    for (let i = 0; i < result; i++) {
      this.listSeleccionado.push( { codigo: row.codigo, vendor: vendor } );

    }
    this.vista = "detalle";

  }

  volverVista(){
    this.vista = "inicial";
    this.listSeleccionado = [];
    //location.reload();
  }

  openSelect(){
    const dialogRef = this.dialog.open(CheckCodePrintComponent,{
      width: "50%",
      height: "800px",
      data: { datos: this.listArtiuclos.filter( ( row:any )=> row.check == true ) }
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
      for( let row of result ){
        for (let i = 0; i < row.cantidadCheck; i++) {
          this.listSeleccionado.push( { codigo: row.codigo, vendor: row.provedor } );

        }
      }
      this.vista = "detalle";
      console.log("****118", this.listSeleccionado)
    });
  }

}

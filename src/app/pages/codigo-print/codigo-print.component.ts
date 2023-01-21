import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import * as _ from 'lodash';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';
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
    private _provedor: ProvedorService
  ) { }

  ngOnInit(): void {
    //this.getArticulos();
    this.getArticles();
    this.getVendor();
  }

  getArticles(){
    this._articulos.get( { } ).subscribe(( res )=>{
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
    this._articulos.getTalla( { where: { articulo: id, estado: 0 }, limit: 1000 } ).subscribe( ( res:any )=>{
      this.listArtiuclos = res.data;
    });
  }


  close(){

  }

  print(){
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
    location.reload();
  }

}

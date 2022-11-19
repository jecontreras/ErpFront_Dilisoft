import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

@Component({
  selector: 'app-codigo-print',
  templateUrl: './codigo-print.component.html',
  styleUrls: ['./codigo-print.component.scss']
})
export class CodigoPrintComponent implements OnInit {
  
  listArtiuclos:any = [];
  vista:string = "inicial";
  listSeleccionado:any = [];

  constructor(
    private _articulos: ArticuloService,
    private _tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this._articulos.getTalla( { where: { }, limit: 1000 } ).subscribe( ( res:any )=>{
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

  async printCodigo( row:any ){
    let result:any = await this._tools.alertInput( {
      title: "Cantidad de Etiquetas a imprimir",
      input: "number"
    });
    console.log( result );
    result = Number( result.value );
    for (let i = 0; i < result; i++) {
      this.listSeleccionado.push( { codigo: row.codigo } );
      
    }
    this.vista = "detalle";

  }

  volverVista(){
    this.vista = "inicial";
    this.listSeleccionado = [];
    location.reload();
  }

}

import { Component, OnInit } from '@angular/core';
import html2canvas from "html2canvas";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToolsService } from 'src/app/services/tools.service';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.scss']
})
export class FormInventarioComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  listInventario:any = [];
  opcionCurrencys:any;
  
  imgcreada = false;
 
  imagenCreada;
  asentado:boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _inventario: InventarioService
  ) { }

  ngOnInit(): void {
    this.getDetalle();
    this.opcionCurrencys = this._tools.currency;
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getDetalle(){
    this._inventario.detalle({ }).subscribe( ( res:any )=>{
      console.log("***,", res)
      this.listInventario = res.listArticulo || [];
      this.suma();
    });
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._inventario.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      this.asentado = this.data.asentado
      console.log( this.data )
    });
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._inventario.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = {
      listArticulo: _.map( this.listInventario, ( item:any )=>{
        let dataFinal:any = {};
        for( let row of item.listColor){
          for( let key of row.listTalla ){
            dataFinal.articulo = item.id;
            dataFinal.cantidad = key.cantidad;
            dataFinal.cantidadReal = key.cantidadReal;
            dataFinal.articuloTalla = key.id;
            dataFinal.diferencia = key.diferencia;
          }
        }
        return {
          articulo: dataFinal.articulo,
          cantidad: dataFinal.cantidad,
          cantidadReal: dataFinal.cantidadReal,
          articuloTalla: dataFinal.articuloTalla,
          diferencia: dataFinal.diferencia,
          user: this.data.user
        }
      }),
      ...this.data
    }
    this._inventario.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
    });
  }
  asentarBtn(){
    this._inventario.asentar( { id: this.id } ).subscribe( ( res:any )=>{
      this._tools.basic("Asentado exitoso!")
      this.asentado = true;
    } );
  }
  print(){
    html2canvas(document.querySelector("#contenido")).then(canvas => {
 
      this.imagenCreada = canvas.toDataURL();      
 
    });
    this.imgcreada = true;
    console.log( this.imagenCreada)
  }

  suma(){
    console.log( this.listInventario ); 
    this.data.totalQuantityDes = 0;
    this.data.totalDes = 0;
    for( let row of this.listInventario ) {
      for( let item of row.listColor ){
        for( let key of item.listTalla ){
          key.diferencia = ( key.cantidadReal || key.cantidad ) - key.cantidad;
          this.data.totalQuantityDes+=key.diferencia;
          this.data.totalDes+= key.diferencia * row.precioCompra;
        }
      }
    }
  }

}

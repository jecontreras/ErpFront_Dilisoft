import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { CategoriaService } from 'src/app/servicesComponent/categoria.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-articulo',
  templateUrl: './form-articulo.component.html',
  styleUrls: ['./form-articulo.component.scss']
})
export class FormArticuloComponent implements OnInit {
  
  listCategoria:any = [];
  listSubCategoria:any = [];
  opcionCurrencys:any;
  data:any = {};
  listcolor:any = [
    {
      color: "",
      listTalla:[
        {
          talla: Number()
        }
      ]
    }
  ];
  id:any;
  titleBTN:string = "Guardar";
  constructor(
    private _tools: ToolsService,
    private _articulo: ArticuloService,
    private activate: ActivatedRoute,
    private _categoria: CategoriaService
  ) { 
  }

  ngOnInit(): void {
    this.opcionCurrencys = this._tools.currency;
    this.getCategoria();
    this.getSubcategoria();
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._articulo.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
      this.listcolor = this.data.listColor;
    });
  }

  getCategoria(){
    this._categoria.get( { where: {
      categoriaPadre:null,
      estado: 0
     }, limit: 1000 } ).subscribe(( res:any )=>{
      this.listCategoria = res.data;
    });
  }
  //
  getSubcategoria(){
    this._categoria.get( { where: {
      categoriaPadre: { '!=': null },
      estado: 0
     }, limit: 1000 } ).subscribe(( res:any )=>{
      this.listSubCategoria = res.data;
    });
  }
  newColor(){
    this.listcolor.push({
      listTalla:[{}]
    });
  }
  async dropColor( item:any ){
    item.estado = 1;
    if( item.id ) await this.updateFun();
    this.listcolor =  _.filter( this.listcolor, ( row:any ) => row.color != item.color );
    //this.listcolor.split( idx, 1);
  }
  newTalla( item:any ){
    item.listTalla.push({});
  }
  async dropTalla( item:any, idx  ){
    item.listTalla[idx].estado = 1;
    if( item.id ) await this.updateFun();
    item.listTalla =  _.filter( item.listTalla, ( row:any ) => row.talla != item.talla );
  } 
  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }
  updateFun(){
    return new Promise( resolve =>{
      let data:any = {
        id: this.data.id,
        articulo: this.data,
        listDetalle: this.listcolor
      };
      this._articulo.update( data ).subscribe(( res:any )=>{
        this._tools.basic("Actualizado exitoso");
        try { this.listcolor = res.data.listDetalle; } catch (error) {}
        resolve( true );
      },( error )=>{ this._tools.basic("Problemas al Actualizar "); resolve( false ); } );
    });
  }
  crearFun(){
    let data = {
      articulo: this.data,
      listDetalle: this.listcolor
    };
    this._articulo.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
    });
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { CategoriaService } from 'src/app/servicesComponent/categoria.service';
import * as _ from 'lodash';
import { ArticuloLogService } from 'src/app/servicesComponent/articulo-log.service';
import { USER } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

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
  list:any = [];
  tablet:any = {
    headers:["Movimiento","Cantidad anterior","Cantidad","Cantidad Total","Fecha MV","Descipcion"],
    row:[],
    keys: ["tipoEntrada","valorAnterior","valor","valorTotal","createdAt", "descripcion"]
  }
  dataUser:any = {};
  _dataConfig:any = {};

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredTallas: Observable<string[]>;
  listTallas: string[] = ['34','35','36','37', '38', '39', '40', '41', '42', '43','44'];
  alllistTallas: string[] = ['34','35','36','37', '38', '39', '40', '41', '42', '43','44'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  constructor(
    private _tools: ToolsService,
    private _articulo: ArticuloService,
    private activate: ActivatedRoute,
    private _categoria: CategoriaService,
    private _articuloLog: ArticuloLogService,
    private _store: Store<USER>,
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit(): void {
    this.listcolor[0].codigo = this._tools.codigo();
    this.opcionCurrencys = this._tools.currency;
    this.getCategoria();
    this.getSubcategoria();
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._articulo.get( { where: { id: this.id } } ).subscribe( async ( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
      this.listcolor = this.data.listColor;
      if( this.data.categoria ) this.data.categoria = this.data.categoria.id;
      if( this.data.subcategoria) this.data.subcategoria = this.data.subcategoria.id;
      for( let row of this.listcolor){
        for( let item of row.listTalla ){
          item.listLogEntrada = await this.getLogs( item.id, 0 );
          //item.listLogSalida = await this.getLogs( item.id, 1 );
        }
      }
      console.log( this.listcolor)
    });
  }

  async getLogs( ids:any, tipo:any ){
    return new Promise( resolve =>{
      this._articuloLog.get( { where: { articuloTalla: ids, estado: 0 }, limit: 1000000 } ).subscribe(( res:any )=>{
        resolve( res.data );
      });
    });
  }

  handleSelectCategory(){
    this.listTallas = ( this.listSubCategoria.find(( item:any )=> item.id === this.data.subcategoria ) ).listSizes || [];
  }

  getCategoria(){
    this._categoria.get( { where: {
      categoriaPadre:null,
      estado: 0
     }, limit: 1000 } ).subscribe(( res:any )=>{
      console.log("*****", res)
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
  newColor( obj, i ){
    //console.log(obj)
    obj.check = !obj.check;
    if( obj.check == true ) this.listcolor.push({
      listTalla:[{ talla: 0, cantidad: 1 }],
      codigo: this._tools.codigo()
    });
    
  }
  async dropColor( item:any ){
    item.estado = 1;
    item.check = false;
    if( item.id ) await this.updateFun();
    this.listcolor =  _.filter( this.listcolor, ( row:any ) => row.color != item.color );
    //this.listcolor.splice( idx, 1);
  }
  newTalla( item:any ){
    item.check = !item.check;
    if( item.check == true ) item.listTalla.push({
      talla: 0,
      cantidad: 1
    });
  }
  async dropTalla( item:any, idx  ){
    item.check = false;
    item.listTalla[idx].check = false;
    item.listTalla[idx].estado = 1;
    if( item.id ) await this.updateFun();
    item.listTalla =  _.filter( item.listTalla, ( row:any ) => row.talla != item.talla );
  } 
  submit(){
    this.data.user = this.dataUser.id;
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
      listDetalle: _.filter( this.listcolor, ( item )=> {
        item.listTalla = _.filter( item.listTalla, ( key )=> key.codigo );
        return item;
      } )
    };
    //console.log( data )
    this._articulo.create( data ).subscribe(( res:any )=>{
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
      this._tools.basic("Creado exitoso")
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.listTallas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.listTallas.indexOf(fruit);

    if (index >= 0) {
      this.listTallas.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.listTallas.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alllistTallas.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  processCode(){
    console.log("***RRR")
    if(this.id) return false;
    for( let row of this.listcolor ){
      row.listTalla = [];
      if( row.color ){
        for( let item of this.listTallas ){
          let titleCode = this._tools.uppercaseFirstLetter( row.color );
          if( item ) row.listTalla.push( { codigo: `${ titleCode }${ this.data.codigo }-${item}`, talla: item, cantidad: 1 } );
        }
      }
      row.listTalla = _.orderBy( row.listTalla, 'talla');
    }
  }



}

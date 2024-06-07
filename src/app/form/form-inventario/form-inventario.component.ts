import { Component, OnInit } from '@angular/core';
import html2canvas from "html2canvas";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToolsService } from 'src/app/services/tools.service';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';
import * as _ from 'lodash';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.scss']
})
export class FormInventarioComponent implements OnInit {

  data:any = {
    fecha: moment().format("YYYY-MM-DD")
  };
  id:any;
  titleBTN:string = "Guardar";
  listInventario:any = [];
  opcionCurrencys:any;

  imgcreada = false;

  imagenCreada;
  asentado:boolean = false;
  dataUser:any = {};
  filtreTxt:string;
  cloneData:any =  [];
  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _inventario: InventarioService,
    private _store: Store<USER>,
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit(): void {
    this.opcionCurrencys = this._tools.currency;
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    else this.getDetalle();
  }

  getDetalle(){
    this._inventario.detalle({ }).subscribe( ( res:any )=>{
      console.log("***,", res)
      this.listInventario = res.listArticulo || [];
      this.cloneData = _.clone( this.listInventario );
      this.suma();
    });
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._inventario.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      this.asentado = this.data.asentado;
      console.log( this.data )
      this.listInventario = _.map( this.data.listArticulo, ( item:any )=>{
        return {
          codigo: item.articuloTalla.codigo,
          cantidad: item.cantidadIngresar,
          titulo: item.articulo.titulo,
          createdAt: moment(item.articulo.createdAt).format("YYYY-MM-DD"),
          //listColor:
        };
      });
    });
  }

  txtFilter(){
    if( this.filtreTxt ) this.listInventario = this.listInventario.filter( ( row )=> row.codigo === this.filtreTxt )
    else this.listInventario = this.cloneData;
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
    let resulFinix:any = [];
    for( const item of this.listInventario ){
      for( let row of item.listColor){
        const filter = row.listTalla.filter( ( lel )=> lel.cantidadReal !== lel.cantidad );
        for( let key of filter ){
          let dataFinal:any = {};
          dataFinal.articulo = item.id;
          dataFinal.cantidad = key.cantidad;
          dataFinal.cantidadReal = key.cantidadReal;
          dataFinal.articuloTalla = key.id;
          dataFinal.diferencia = key.diferencia;
          dataFinal.user = this.data.user;
          resulFinix.push( dataFinal );
        }
      }
    }
    let data = {
      ...this.data,
      user: this.dataUser.id,
      listArticulo: resulFinix
    }
    console.log("*****99", data)
    this._inventario.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      res = res.data;
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

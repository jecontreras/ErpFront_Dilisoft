import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

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
  ) { }

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

  }

  getSubcategoria(){

  }
  newColor(){
    this.listcolor.push({
      listTalla:[{}]
    });
  }
  newTalla( item:any ){
    item.listTalla.push({});
  }
  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }
  updateFun(){
    let data:any = {
      id: this.data.id,
      articulo: this.data,
      listDetalle: this.listcolor
    };
    this._articulo.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
      try { this.listcolor = res.data.listDetalle; } catch (error) {}
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

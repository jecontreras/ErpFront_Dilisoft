import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { CategoriaService } from 'src/app/servicesComponent/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {
  
  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  listCategoria:any = [];

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _categoria: CategoriaService
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    this.getCategoria();
  }

  getCategoria(){
    this._categoria.get( { where: {
      categoriaPadre:null,
      estado: 0
     }, limit: 1000 } ).subscribe(( res:any )=>{
      this.listCategoria = res.data;
      console.log(this.listCategoria)
    });
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._categoria.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
    });
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._categoria.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._categoria.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
    });
  }

}

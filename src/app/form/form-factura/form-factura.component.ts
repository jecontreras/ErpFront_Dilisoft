import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { FacturaService } from 'src/app/servicesComponent/factura.service';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.scss']
})
export class FormFacturaComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  tablet:any = {
    headers:["Codigo", "Titulo", "Color", "Talla", "Cantidad"],
    row:[],
    keys:["codigo", "titulo","color","talla","cantidad"]
  };
  querys:any = {
    where:{
      estado:0
    },
    page:0,
    limit: 10000
  };
  datoBusqueda:string;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _factura: FacturaService,
    private _articulos: ArticuloService
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._factura.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
    });
  }
  filtroGet(){
    this.querys.where.or = [
      {
        slug: {
          contains: this.datoBusqueda|| ''
        }
      },
      {
        codigo: {
          contains: this.datoBusqueda|| ''
        }
      },
      {
        titulo: {
          contains: this.datoBusqueda|| ''
        }
      }
    ];
    this.getArticulos();
  }
  getArticulos(){
    this.tablet.row = [];
    this._articulos.get( this.querys ).subscribe( ( res:any )=>{
      res = res.data;
      this.tablet.row = res;
    });
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._factura.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._factura.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
    });
  }

}

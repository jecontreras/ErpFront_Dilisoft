import { Component, OnInit } from '@angular/core';
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
      color: "Negro",
      listTalla:[
        {
          talla: 37
        }
      ]
    }
  ];
  id:any;
  constructor(
    private _tools: ToolsService,
    private _articulo: ArticuloService
  ) { }

  ngOnInit(): void {
    //this.opcionCurrencys = this._tools.currency;
    this.getCategoria();
    this.getSubcategoria();
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

  }
  crearFun(){

  }

}

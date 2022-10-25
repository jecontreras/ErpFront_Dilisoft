import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() _dataConfig: any = {
    titulo: "",
    returnHTML: "",
    model: "",
    btn:{
      btnCrear: {
        titulo: "",
        click: ""
      }
    },
    tablet:{
      headers:[],
      keys:[],
      row:[]
    }
  };
  querys:any = {};
  _model:any;
  constructor(
    private _router: Router,
    private _tools: ToolsService
  ) { }

  ngOnInit(): void {
    console.log("***", this._dataConfig )
    this.querys = this._dataConfig.querys || {};
    this._model = this._dataConfig.model;
    this.getList();
  }

  getList(){
    this._model.get( this.querys ).subscribe( ( res:any  )=>{
      this._dataConfig.tablet.row.push(... res.data);
      console.log("****", this._dataConfig.tablet.row)
      this._dataConfig.tablet.row =_.unionBy(this._dataConfig.tablet.row || [], res.data, 'id');
    });
  }

  openVer( item ){
    this._router.navigate([ this._dataConfig.returnHTML, item.id]);
  }

  async deleteItem( item:any ){
    let confirm = await this._tools.confirm( {title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if(!confirm.value) return false;
    let data ={
      id: item.id,
      estado: 1
    };
    this._model.update( data ).subscribe( (res:any )=>{
      this._dataConfig.tablet.row =  _.filter( this._dataConfig.tablet.row, ( row:any ) => row.id != data.id );
    },()=>this._tools.basic("Problemas al Eliminar Item") );
  }

}

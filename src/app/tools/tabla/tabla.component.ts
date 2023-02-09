import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
  notscrolly: boolean = true;
  notEmptyPost: boolean = true;
  opcionCurrencys:any;
  header2 = ["codigo","Talla","Cantidad"];
  keys2=["codigo","talla","cantidad"];

  expandedElement: PeriodicElement | null;

  constructor(
    private _router: Router,
    public _tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.opcionCurrencys = this._tools.currency;
    console.log("***", this._dataConfig )
    this.querys = this._dataConfig.querys || {};
    this._model = this._dataConfig.model;
    this.querys.page = 0;
    this.getList();
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.querys.page++;
      this.getList();
    }
  }

  getList(){
    console.log("**", this.querys)
    this._model.get( this.querys ).subscribe( ( res:any  )=>{
      this._dataConfig.tablet.row.push(... res.data);
      this._dataConfig.tablet.row =_.unionBy(this._dataConfig.tablet.row || [], res.data, 'id');
      for( const item of this._dataConfig.tablet.row ) for( const key of item.listColor ) {
        key.amount = ( _.sumBy(key.listTalla, 'cantidad') || 1 );
        let filter = key.listTalla.find( ( oll )=> oll.cantidad <= 5 );
        if( filter ) item.danger = true;
        filter = key.listTalla.find( ( oll )=> oll.cantidad <= 10 );
        if( filter ) item.warning = true;
      }
      console.log("****", this._dataConfig.tablet.row)
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
      estado: 1,
      completo: true
    };
    this._model.update( data ).subscribe( (res:any )=>{
      this._dataConfig.tablet.row =  _.filter( this._dataConfig.tablet.row, ( row:any ) => row.id != data.id );
    },()=>this._tools.basic("Problemas al Eliminar Item") );
  }

}

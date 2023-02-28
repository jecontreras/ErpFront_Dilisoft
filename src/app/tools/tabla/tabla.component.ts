import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  txtFilter:string;

  expandedElement: PeriodicElement | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

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

  pageEvent(ev: any) {
    this.querys.page = ev.pageIndex;
    this.querys.limit = ev.pageSize;
    this.getList();
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.querys.page++;
      this.getList();
    }
  }

  filterTxt(){
    this.querys.page = 0;
    this.querys.where.codigo = this.txtFilter;
    this._dataConfig.tablet.row = [];
    this.resultsLength = 0;
    this.getList();
  }

  getList(){
    console.log("**", this.querys)
    this._model.get( this.querys ).subscribe( ( res:any  )=>{
      this.resultsLength = res.count;
      this._dataConfig.tablet.row.push(... res.data);
      this._dataConfig.tablet.row =_.unionBy(this._dataConfig.tablet.row || [], res.data, 'id');
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      try {
        for( const item of this._dataConfig.tablet.row ) for( const key of item.listColor ) {
          key.amount = ( _.sumBy(key.listTalla, 'cantidad') || 1 );
          let filter = key.listTalla.find( ( oll )=> oll.cantidad <= 5 );
          if( filter ) item.danger = true;
          filter = key.listTalla.find( ( oll )=> oll.cantidad <= 10 );
          if( filter ) item.warning = true;
        }
      } catch (error) {}
      console.log("****", this._dataConfig.tablet.row)
    });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
    this.querys.page = 0;
  }

  openVer( item ){
    this._router.navigate([ this._dataConfig.returnHTML, item.id]);
  }

  async deleteItem( item:any ){
    if( item.asentado == true ) return this._tools.basic("Problemas al Eliminar Item no se puede porque ya se encuentra asentado");
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

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArticuloDialogComponent } from '../articulo-dialog/articulo-dialog.component';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';

interface Transaction {
  nameRef:string;
  nameColor: string;
  pd_tallas: string;
  cantidadT: number;
}

@Component({
  selector: 'app-open-summary-web',
  templateUrl: './open-summary-web.component.html',
  styleUrls: ['./open-summary-web.component.scss']
})
export class OpenSummaryWebComponent implements OnInit {
  listSummary: Transaction[] = [];
  displayedColumns: string[] = ['nameRef', 'nameColor', 'pd_tallas', 'cantidadT'];
  transactions: Transaction[] = [];
  sumCantidad:number = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ArticuloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private _tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.listSummary = this.processSum( );
    this.transactions = this.listSummary;
    console.log("*****19", this.datas, this.listSummary, this.transactions )
  }

  getTotalCost() {
    return this.transactions.map(t => t.cantidadT).reduce((acc, value) => acc + value, 0);
  }

  processSum(){
    let dataEnd = Array();
    this.sumCantidad = 0;
    for( let row of this.datas ){
      for( let summary of row.resumenArticle ) {
        let findIndex = dataEnd.findIndex( item => item.pd_ref_id === summary.pd_ref_id && item.pd_color_id === summary.pd_color_id && item.pd_tallas === summary.pd_tallas );
        if( findIndex >= 0 ){
          dataEnd[ findIndex ].cantidadT+= summary.cantidad;
        }else{
          summary.cantidadT = summary.cantidad;
          dataEnd.push( summary );
        }
      }
    }
    dataEnd = _.orderBy(dataEnd, ['nameRef'], ['asc']);
    this.sumCantidad = _.sumBy(dataEnd, 'cantidadT');
    return dataEnd;
  }

  printArticulo(){
    setTimeout(()=>{
      this._tools.print();
    }, 2000 );
  }
  close(){
    this.dialogRef.close();
  }

}

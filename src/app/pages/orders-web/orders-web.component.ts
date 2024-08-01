import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OpenSummaryWebComponent } from 'src/app/dialog/open-summary-web/open-summary-web.component';
import { PeriodicElement, webOrdersDto } from 'src/app/interfaces/interfaces';
import { ToolsService } from 'src/app/services/tools.service';
import { OrdersWebService } from 'src/app/servicesComponent/orders-web.service';


const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-orders-web',
  templateUrl: './orders-web.component.html',
  styleUrls: ['./orders-web.component.scss']
})
export class OrdersWebComponent implements OnInit {

  displayedColumns: string[] = ['select', 'ref', 'peers', 'name', 'numberCel', 'address', 'urlGuide'];
  displayedColumns2: string[] = ['select', 'ref', 'peers', 'price', "create"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataFind:any = { txt: "" }
  querys:any = {
    page: 0,
    limit: 30,
    where:{
      estado: 0
    }
  };
  isLoadingResults = true;
  isRateLimitReached = false;
  dataWebOrdersList = new MatTableDataSource<webOrdersDto>();
  selection2 = new SelectionModel<webOrdersDto>(true, []);
  resultsLength:number = 0;

  constructor(
    private _orders: OrdersWebService,
    public dialog: MatDialog,
    public _tools: ToolsService
  ) { }

  ngOnInit() {
    /*let list:any = await this.getOrders();
    this.dataSource.data = list;*/
    this.handleInitProcess();
  }

  async handleInitProcess(){
    let list:any = await this.getWebOrders();
    this.dataWebOrdersList.data = list.data;
    this.resultsLength = list.count;
  }

  getWebOrders(){
    return new Promise( resolve =>{
      this._orders.getWebOrders( this.querys ).subscribe( res => resolve( res ), error => resolve( {} ) );
    })
  }

  pageEvent(ev: any) {
    this.querys.page = ev.pageIndex;
    this.querys.limit = ev.pageSize;
    this.isLoadingResults = true;
    this.isRateLimitReached = true;
    this.getWebOrders();
  }

  getOrders(){
    return new Promise( resolve =>{
      this._orders.get( {  "page": 1, "size": 100 } ).subscribe( res => resolve( res ), error => resolve( {} ) );
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataWebOrdersList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection2.clear();
      return;
    }

    this.selection2.select(...this.dataWebOrdersList.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: webOrdersDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  handlePrintSummary( ){
    let data = Array();
    data = this.selection2.selected;
    const dialogRef = this.dialog.open(OpenSummaryWebComponent,{
      width: "100%",
      height: "800px",
      data: data
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
      if( result ) { this.handleInitProcess(); this.selection2.clear(); }
    });
  }

  handleGenerateF(){
    this.handlePrintSummary();
  }

}

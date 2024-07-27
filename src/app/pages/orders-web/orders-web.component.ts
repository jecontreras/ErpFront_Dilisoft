import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OpenSummaryWebComponent } from 'src/app/dialog/open-summary-web/open-summary-web.component';
import { OrdersWebService } from 'src/app/servicesComponent/orders-web.service';
export interface PeriodicElement {
  id:string;
  select: boolean;
  c_nombre: string;
  celular: string;
  celular2: string;
  p_pais: string;
  m_municipio: string;
  barrio: string;
  direccion: string;
  pares: number;
  guia_url: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-orders-web',
  templateUrl: './orders-web.component.html',
  styleUrls: ['./orders-web.component.scss']
})
export class OrdersWebComponent implements OnInit {

  displayedColumns: string[] = ['select', 'ref', 'peers', 'name', 'numberCel', 'address', 'urlGuide'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  dataFind:any = { txt: "" }
  constructor(
    private _orders: OrdersWebService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    let list:any = await this.getOrders();
    console.log("*******38", list )
    this.dataSource.data = list;
    console.log("***", this.dataSource.data)
  }

  getOrders(){
    return new Promise( resolve =>{
      this._orders.get( {  "page": 1, "size": 100 } ).subscribe( res => resolve( res ), error => resolve( {} ) );
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  handlePrintSummary( ){
    let data = Array();
    data = this.selection.selected;
    const dialogRef = this.dialog.open(OpenSummaryWebComponent,{
      width: "100%",
      height: "800px",
      data: data
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);

    });
  }

}

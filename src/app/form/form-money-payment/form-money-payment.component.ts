import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FacturaDto as billDto } from 'src/app/interfaces/interfaces';
import { ToolsService } from 'src/app/services/tools.service';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import { MoneyPaymentService } from 'src/app/servicesComponent/money-payment.service';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-form-money-payment',
  templateUrl: './form-money-payment.component.html',
  styleUrls: ['./form-money-payment.component.scss']
})
export class FormMoneyPaymentComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  listProvedor:any = [];
  opcionCurrencys:any;
  listBill:billDto[] = [];
  displayedColumns: string[] = ["select","codigo","nombreCliente","fecha", "monto","provedor","updatedAt","amountPass", "remaining"];
  dataSource = new MatTableDataSource<billDto>(this.listBill);
  selection = new SelectionModel<billDto>(true, []);
  validateButton:boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _moneyPayment: MoneyPaymentService,
    private _provedor: ProvedorService,
    private _factura: FacturaService
  ) {
  }

  ngOnInit(): void {
    this.opcionCurrencys = this._tools.currency;
    this.getProvedor();
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    else {
      this.getFacturas();
    }
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._moneyPayment.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
    });
  }

  getProvedor(){
    this._provedor.get( { where: { estado: 0 } } ).subscribe(( res:any )=>{
      this.listProvedor = res.data;
    });
  }

  getFacturas(){
    this._factura.get( { where: { estado:0, asentado:true, entrada: 1/*coinFinix:false*/ } } ).subscribe( ( data )=>{
      this.listBill = data.data;
      console.log( "*****58",this.listBill )
      this.dataSource = new MatTableDataSource<billDto>(this.listBill);
    } );
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._moneyPayment.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._moneyPayment.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
    });
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
  checkboxLabel(row?: billDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo }`;
  }
  async checkAmount( row:billDto ){
    this.addition();
    if( row.check ) return row.check = false;
    const result: { value?:string; } = await this._tools.alertInput( { title: "Cantidad Seleccionar" } );
    row.amountPass = Number( result.value || 1 );
    row.check = true;
    console.log( "***126",this.selection)
  }
  addition(){
    for( const item of this.selection.selected ){
      console.log("****130", item )
      if( ( this.data.coin >= item.amountPass ) && ( this.data.remaining ) ) {
        item.remaining = item.monto - item.amountPass;
        this.data.remaining = item.monto;
      }
    }
  }
}

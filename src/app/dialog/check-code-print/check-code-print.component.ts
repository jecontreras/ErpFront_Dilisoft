import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';
import { PeriodicElement } from 'src/app/tools/tabla/tabla.component';

@Component({
  selector: 'app-check-code-print',
  templateUrl: './check-code-print.component.html',
  styleUrls: ['./check-code-print.component.scss']
})
export class CheckCodePrintComponent implements OnInit {
  dataSource = [];
  columnsToDisplay = ['codigo', 'cantidadCheck', 'provedor'];
  expandedElement: PeriodicElement | null;
  listVendor:any = [];

  constructor(
    public dialogRef: MatDialogRef<CheckCodePrintComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private _provedor: ProvedorService
  ) { }

  ngOnInit(): void {
    this.getVendor();
    this.dataSource = this.datas.datos || [];
    for( let row of this.dataSource) row.cantidadCheck = 5;
  }

  seleccionado(){
    this.close();
  }

  getVendor(){
    this._provedor.get( { where:{ estado: 0 }, limit: 1000 }).subscribe(( res )=>{
      this.listVendor = res.data;
    });
  }

  close(){
    this.dialogRef.close( this.dataSource );
  }

}

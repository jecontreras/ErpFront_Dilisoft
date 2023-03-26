import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovementItemComponent } from 'src/app/dialog/movement-item/movement-item.component';
import { ToolsService } from 'src/app/services/tools.service';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';
import { XlsService } from 'src/app/servicesComponent/xls.service';

@Component({
  selector: 'app-printarticulos',
  templateUrl: './printarticulos.component.html',
  styleUrls: ['./printarticulos.component.scss']
})
export class PrintarticulosComponent implements OnInit {

  listInventario:any = [];
  searchCodigo!:string;
  listXls:any = [];
  txtDesplege:boolean = false;

  constructor(
    private _inventario: InventarioService,
    private _tools: ToolsService,
    private _router: Router,
    public dialog: MatDialog,
    private _xls: XlsService
  ) { }

  ngOnInit(): void {
    this.getDetalle();
  }

  getDetalle(){
    console.log( this.searchCodigo )
    this._inventario.detalle({ codigo: this.searchCodigo }).subscribe( ( res:any )=>{
      console.log("***,", res)
      this.listInventario = res.listArticulo || [];
      this.populateData();
    });
  }

  populateData(){
    this.listXls = [];
    for( const item of this.listInventario ){
      item.disabledView = this.txtDesplege;
      item.cantidad = 0;
      for( const keys of item.listColor ){
        keys.cantidad = 0;
        for( const pro of keys.listTalla ){
          keys.cantidad+= pro.cantidad;
          item.cantidad+=pro.cantidad;
          this.listXls.push( {
            id: pro.id,
            codigo: pro.codigo,
            talla: pro.talla,
            cantidad: pro.cantidad,
            estado: pro.estado == 0 ? 'Activo' : 'inactivo',
            cantidadReal: pro.cantidadReal
          } );
        }
      }
    }
    console.log("*****58", this.listInventario)
  }

  openMovementArticle( item ){
    const dialogRef = this.dialog.open(MovementItemComponent,{
      width: "100%",
      height: "800px",
      data: item
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
    });

  }

  volverVista(){
    this._router.navigate(['/inventario']);
  }

  print(){
    //window.print();
    this._xls.exportAsExcelFile( this.listXls, "Articulos");
  }

}

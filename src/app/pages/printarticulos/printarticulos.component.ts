import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        for( const pro of keys.listTalla ){
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
  }

  volverVista(){
    this._router.navigate(['/inventario']);
  }

  print(){
    //window.print();
    this._xls.exportAsExcelFile( this.listXls, "Articulos");
  }

}

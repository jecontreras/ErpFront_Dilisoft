import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';

@Component({
  selector: 'app-printarticulos',
  templateUrl: './printarticulos.component.html',
  styleUrls: ['./printarticulos.component.scss']
})
export class PrintarticulosComponent implements OnInit {
  
  listInventario:any = [];
  searchCodigo!:string;

  constructor(
    private _inventario: InventarioService,
    private _tools: ToolsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getDetalle();
  }

  getDetalle(){
    console.log( this.searchCodigo )
    this._inventario.detalle({ codigo: this.searchCodigo }).subscribe( ( res:any )=>{
      console.log("***,", res)
      this.listInventario = res.listArticulo || [];
    });
  }

  volverVista(){
    this._router.navigate(['/inventario']);
  }

  print(){
    window.print();
  }

}

import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';

@Component({
  selector: 'app-codigo-print',
  templateUrl: './codigo-print.component.html',
  styleUrls: ['./codigo-print.component.scss']
})
export class CodigoPrintComponent implements OnInit {
  
  listArtiuclos:any = [];

  constructor(
    private _articulos: ArticuloService
  ) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this._articulos.getTalla( { where: { }, limit: 1000 } ).subscribe( ( res:any )=>{
      this.listArtiuclos = res.data;
    });
  }

  close(){

  }

  seleccionado(){
    
  }

}

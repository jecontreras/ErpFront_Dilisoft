import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';

@Component({
  selector: 'app-provedor',
  templateUrl: './provedor.component.html',
  styleUrls: ['./provedor.component.scss']
})
export class ProvedorComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Provedores",
    returnHTML: "formprovedor/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Provedor",
        click: "CrearProvedor()"
      }
    },
    tablet:{
      headers:["Select","Titulo","Celular","Creado","Actualizado"],
      row:[],
      keys: ["select","titulo", "celular","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _provedor: ProvedorService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._provedor;
  }

  CrearProvedor(){
    this._router.navigate(['/formprovedor']);
  }

}

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
      headers:["Titulo","Celular","Creado","Actualizado"],
      row:[],
      keys: ["titulo", "celular", "creado","actualizado"]
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

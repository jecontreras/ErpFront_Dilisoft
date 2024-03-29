import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/servicesComponent/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Empresa",
    returnHTML: "formempresa/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Empresa",
        click: "CrearEmpresa()"
      }
    },
    tablet:{
      headers:["Select","Titulo","Imagen","nit","Nombre acargo","Telefonno","Creado","Actualizado"],
      row:[],
      keys: ["select","titulo", "imagen", "nit", "nombreAcargo","telefono","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _empresa: EmpresaService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._empresa;
  }

  CrearEmpresa(){
    this._router.navigate(['/formempresa']);
  }

}

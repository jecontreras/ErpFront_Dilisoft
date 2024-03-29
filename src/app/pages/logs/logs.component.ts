import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicesComponent/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Logs",
    returnHTML: "formlogs/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Logs",
        click: "CrearLogs()"
      }
    },
    tablet:{
      headers:["Select","Txt","Creado","Actualizado"],
      row:[],
      keys: ["select","txt","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _logs: LogsService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._logs;
  }

  CrearLogs(){
    this._router.navigate(['/formlogs']);
  }

}

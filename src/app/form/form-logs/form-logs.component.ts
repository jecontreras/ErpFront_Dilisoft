import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { LogsService } from 'src/app/servicesComponent/logs.service';

@Component({
  selector: 'app-form-logs',
  templateUrl: './form-logs.component.html',
  styleUrls: ['./form-logs.component.scss']
})
export class FormLogsComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _logs: LogsService
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._logs.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      console.log( this.data )
    });
  }

  submit(){
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._logs.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._logs.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
    });
  }

}

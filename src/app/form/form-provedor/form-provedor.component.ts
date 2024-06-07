import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ProvedorService } from 'src/app/servicesComponent/provedor.service';

@Component({
  selector: 'app-form-provedor',
  templateUrl: './form-provedor.component.html',
  styleUrls: ['./form-provedor.component.scss']
})
export class FormProvedorComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _provedor: ProvedorService
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._provedor.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
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
    this._provedor.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._provedor.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
    });
  }

}

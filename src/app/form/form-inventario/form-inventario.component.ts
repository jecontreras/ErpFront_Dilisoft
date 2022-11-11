import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToolsService } from 'src/app/services/tools.service';
import { InventarioService } from 'src/app/servicesComponent/inventario.service';

@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.scss']
})
export class FormInventarioComponent implements OnInit {

  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  listInventario:any = [
    {
      codigo: "ACE123",
      titulo: "Holis",
      createdAt: moment().format("DD-MM-YYYY"),
      color:[
        {
          color: "verde",
          listArticulo:[
            {
              codigo: "ACE123",
              talla: 35,
              cantidad: 5
            }
          ]
        }
      ]
    },
    {
      codigo: "ACE147",
      titulo: "MEN",
      createdAt: moment().format("DD-MM-YYYY"),
      color:[
        {
          color: "verde",
          listArticulo:[
            {
              codigo: "ACE147",
              talla: 35,
              cantidad: 5
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _inventario: InventarioService
  ) { }

  ngOnInit(): void {
    this.getDetalle();
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getDetalle(){
    this._inventario.detalle({ }).subscribe( ( res:any )=>{
      console.log("***,", res)
      //this.listInventario = res;
    });
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._inventario.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
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
    this._inventario.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._inventario.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
    });
  }

}

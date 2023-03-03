import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyPaymentService } from 'src/app/servicesComponent/money-payment.service';

@Component({
  selector: 'app-money-payment',
  templateUrl: './money-payment.component.html',
  styleUrls: ['./money-payment.component.scss']
})
export class MoneyPaymentComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Provedores",
    returnHTML: "formmoneypayment/",
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
      headers:["Select","Codigo","Description","Monto","Creado","Actualizado"],
      row:[],
      keys: ["select","codigo","description", "coin","createdAt","updatedAt"]
    }
  };
  constructor(
    private _router: Router,
    private _moneyPayment: MoneyPaymentService
  ) { }

  ngOnInit(): void {
    this._dataConfig.model = this._moneyPayment;
  }

  handleCreateBonus(){
    this._router.navigate(['/formmoneypayment']);
  }

}

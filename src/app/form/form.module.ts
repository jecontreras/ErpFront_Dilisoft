import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArticuloComponent } from './form-articulo/form-articulo.component';
import { RouterModule } from '@angular/router';
import { FormRoutes } from './admin-layout.routing';
import { NgxCurrencyModule } from "ngx-currency";
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';
import { FormFacturaComponent } from './form-factura/form-factura.component';
import { FormInventarioComponent } from './form-inventario/form-inventario.component';
import { FormLogsComponent } from './form-logs/form-logs.component';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { FormProvedorComponent } from './form-provedor/form-provedor.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { DialogModule } from '../dialog/dialog.module';
import { MyOwnCustomMaterialModule } from '../app.material.module';
import { ToolsModule } from '../tools/tools.module';
import { FormMoneyPaymentComponent } from './form-money-payment/form-money-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FormArticuloComponent,
    FormCategoriaComponent,
    FormEmpresaComponent,
    FormFacturaComponent,
    FormInventarioComponent,
    FormLogsComponent,
    FormPerfilComponent,
    FormProvedorComponent,
    FormMoneyPaymentComponent
  ],
  exports:[
    FormArticuloComponent,
    FormCategoriaComponent,
    FormEmpresaComponent,
    FormFacturaComponent,
    FormInventarioComponent,
    FormLogsComponent,
    FormPerfilComponent,
    FormProvedorComponent,
    FormMoneyPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCurrencyModule,
    QRCodeModule,
    NgxBarcodeModule,
    DialogModule,
    ToolsModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(FormRoutes),
  ]
})
export class FormModule { }

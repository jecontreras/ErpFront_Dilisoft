import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArticuloComponent } from './form-articulo/form-articulo.component';
import { RouterModule } from '@angular/router';
import { FormRoutes } from './admin-layout.routing';
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormArticuloComponent
  ],
  exports:[
    FormArticuloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCurrencyModule,
    RouterModule.forChild(FormRoutes),
  ]
})
export class FormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArticuloComponent } from './form-articulo/form-articulo.component';
import { RouterModule } from '@angular/router';
import { FormRoutes } from './admin-layout.routing';



@NgModule({
  declarations: [
    FormArticuloComponent
  ],
  exports:[
    FormArticuloComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormRoutes),
  ]
})
export class FormModule { }

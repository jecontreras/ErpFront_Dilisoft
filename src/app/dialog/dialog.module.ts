import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloDialogComponent } from './articulo-dialog/articulo-dialog.component';
import { FormsModule } from '@angular/forms';
import { CheckCodePrintComponent } from './check-code-print/check-code-print.component';
import { MyOwnCustomMaterialModule } from '../app.material.module';



@NgModule({
  entryComponents:[
    ArticuloDialogComponent,
    CheckCodePrintComponent
  ],
  declarations: [
    ArticuloDialogComponent,
    CheckCodePrintComponent,
  ],
  exports:[
    ArticuloDialogComponent,
    CheckCodePrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyOwnCustomMaterialModule

  ]
})
export class DialogModule { }

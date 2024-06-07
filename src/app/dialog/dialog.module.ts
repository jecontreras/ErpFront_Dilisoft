import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloDialogComponent } from './articulo-dialog/articulo-dialog.component';
import { FormsModule } from '@angular/forms';
import { CheckCodePrintComponent } from './check-code-print/check-code-print.component';
import { MyOwnCustomMaterialModule } from '../app.material.module';
import { MovementItemComponent } from './movement-item/movement-item.component';



@NgModule({
  entryComponents:[
    ArticuloDialogComponent,
    CheckCodePrintComponent,
    MovementItemComponent
  ],
  declarations: [
    ArticuloDialogComponent,
    CheckCodePrintComponent,
    MovementItemComponent,
  ],
  exports:[
    ArticuloDialogComponent,
    CheckCodePrintComponent,
    MovementItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyOwnCustomMaterialModule

  ]
})
export class DialogModule { }

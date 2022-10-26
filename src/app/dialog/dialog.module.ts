import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloDialogComponent } from './articulo-dialog/articulo-dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  entryComponents:[
    ArticuloDialogComponent
  ],
  declarations: [
    ArticuloDialogComponent
  ],
  exports:[
    ArticuloDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class DialogModule { }

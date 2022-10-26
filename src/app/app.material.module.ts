
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    DragDropModule,
    MatDialogModule
  ],
  exports: [
    DragDropModule,
    MatDialogModule
  ],
})
export class MyOwnCustomMaterialModule { }

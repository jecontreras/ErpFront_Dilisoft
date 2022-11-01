
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule
  ],
})
export class MyOwnCustomMaterialModule { }

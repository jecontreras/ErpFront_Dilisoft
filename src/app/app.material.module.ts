
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule
  ],
  exports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule
  ],
})
export class MyOwnCustomMaterialModule { }

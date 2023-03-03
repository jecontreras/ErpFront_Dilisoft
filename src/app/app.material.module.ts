
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
})
export class MyOwnCustomMaterialModule { }

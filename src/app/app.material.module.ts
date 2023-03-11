
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    DragDropModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
})
export class MyOwnCustomMaterialModule { }

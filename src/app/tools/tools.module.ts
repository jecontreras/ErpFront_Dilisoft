import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ArchivosComponent } from './archivos/archivos.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MyOwnCustomMaterialModule } from '../app.material.module';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableStatisticsComponent } from './table-statistics/table-statistics.component';

@NgModule({
  declarations: [
    TablaComponent,
    ArchivosComponent,
    TableStatisticsComponent,
  ],
  exports:[
    TablaComponent,
    TableStatisticsComponent,
    ArchivosComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule, NgbAlertModule, NgbDatepickerModule,
    InfiniteScrollModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    MyOwnCustomMaterialModule,
    FormsModule
  ]
})
export class ToolsModule { }

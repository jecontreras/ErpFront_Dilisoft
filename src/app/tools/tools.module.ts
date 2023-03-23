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

@NgModule({
  declarations: [
    TablaComponent,
    ArchivosComponent,
  ],
  exports:[
    TablaComponent,
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

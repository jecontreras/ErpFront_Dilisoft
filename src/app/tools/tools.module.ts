import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ArchivosComponent } from './archivos/archivos.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MyOwnCustomMaterialModule } from '../app.material.module';

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
    InfiniteScrollModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    MyOwnCustomMaterialModule
  ]
})
export class ToolsModule { }

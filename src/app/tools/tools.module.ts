import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    TablaComponent
  ],
  exports:[
    TablaComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgxSpinnerModule
  ]
})
export class ToolsModule { }

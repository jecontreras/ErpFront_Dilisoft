import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';



@NgModule({
  declarations: [
    TablaComponent
  ],
  exports:[
    TablaComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ToolsModule { }

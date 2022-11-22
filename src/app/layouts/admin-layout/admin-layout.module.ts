import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloComponent } from 'src/app/pages/articulo/articulo.component';
import { ToolsModule } from 'src/app/tools/tools.module';
import { FormModule } from 'src/app/form/form.module';
import { CategoriaComponent } from 'src/app/pages/categoria/categoria.component';
import { InventarioComponent } from 'src/app/pages/inventario/inventario.component';
import { EmpresaComponent } from 'src/app/pages/empresa/empresa.component';
import { FacturaComponent } from 'src/app/pages/factura/factura.component';
import { LogsComponent } from 'src/app/pages/logs/logs.component';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';
import { ProvedorComponent } from 'src/app/pages/provedor/provedor.component';
import { CodigoPrintComponent } from 'src/app/pages/codigo-print/codigo-print.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PrintarticulosComponent } from 'src/app/pages/printarticulos/printarticulos.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxBarcodeModule,
    ClipboardModule,
    ToolsModule,
    FormModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ArticuloComponent,
    CategoriaComponent,
    InventarioComponent,
    EmpresaComponent,
    FacturaComponent,
    LogsComponent,
    PerfilComponent,
    ProvedorComponent,
    CodigoPrintComponent,
    PrintarticulosComponent
  ]
})

export class AdminLayoutModule {}

import { Routes } from '@angular/router';
import { FormArticuloComponent } from './form-articulo/form-articulo.component';

export const FormRoutes: Routes = [
    { path: 'formarticulo',           component: FormArticuloComponent },
    { path: 'formarticulo/:id',           component: FormArticuloComponent },
];

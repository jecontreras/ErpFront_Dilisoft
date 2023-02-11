import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-primary', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Perfil',  icon:'ni-single-02 text-yellow', class: '' },
    //{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    //{ path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/articulo', title: 'Articulo',  icon:'ni-briefcase-24 text-pink', class: '' },
    { path: '/categoria', title: 'Categoria',  icon:'ni-building text-pink', class: '' },
    { path: '/empresa', title: 'Empresa',  icon:'ni-istanbul text-pink', class: '' },
    { path: '/factura', title: 'Factura',  icon:'ni-credit-card text-pink', class: '' },
    { path: '/inventario', title: 'Inventario',  icon:'ni-books text-pink', class: '' },
    { path: '/logs', title: 'Logs',  icon:'ni-ui-04 text-pink', class: '' },
    { path: '/perfil', title: 'Roles',  icon:'ni-vector text-pink', class: '' },
    { path: '/provedor', title: 'Provedor',  icon:'ni-world text-pink', class: '' },
    { path: '/moneypayment', title: 'abonos dinero',  icon:'ni-world text-pink', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

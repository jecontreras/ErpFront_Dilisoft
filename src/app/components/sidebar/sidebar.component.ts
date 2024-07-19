import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    disabled?: boolean;
}
export let ROUTES: RouteInfo[] = [];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  dataUser:any = {};
  viewProfile:string = 'visitante';
  constructor(
    private router: Router,
    private _store: Store<USER>,
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      try {
        this.viewProfile = this.dataUser.usu_perfil.prf_descripcion;
      } catch (error) {

      }
    });
  }

  ngOnInit() {
    ROUTES = [
      { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-primary', class: '' ,disabled: ( this.viewProfile === 'visitante' ) || ( this.viewProfile === 'admin' ) },
      //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
      //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
      { path: '/user-profile', title: 'Perfil',  icon:'ni-single-02 text-yellow', class: '' , disabled: ( this.viewProfile === 'visitante' ) || ( this.viewProfile === 'admin' )},
      //{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
      //{ path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
      //{ path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
      { path: '/articulo', title: 'Articulo',  icon:'ni-briefcase-24 text-pink', class: '', disabled: ( this.viewProfile === 'admin' ) },
      { path: '/empresa', title: 'Empresa',  icon:'ni-istanbul text-pink', class: '', disabled: ( this.viewProfile === 'admin' ) },
      { path: '/factura', title: 'Factura',  icon:'ni-credit-card text-pink', class: '', disabled: ( this.viewProfile === 'admin' ) },
      { path: '/orderWeb', title: 'Pedidos Web',  icon:'ni-credit-card text-pink', class: '', disabled: ( this.viewProfile === 'admin' ) },
      { path: '/estadisticas', title: 'Estadisticas',  icon:'ni-credit-card text-pink', class: '', disabled: ( this.viewProfile === 'visitante' ) || ( this.viewProfile === 'admin' ) },
      { path: '/actionsreturns', title: 'Devoluciones / Cambios',  icon:'ni-world text-pink', class: '' , disabled: ( this.viewProfile === 'admin' )},
      { path: '/moneypayment', title: 'Abonos dinero',  icon:'ni-credit-card text-pink', class: '' , disabled:  ( this.viewProfile === 'admin' )},
      { path: '/inventario', title: 'Inventario',  icon:'ni-books text-pink', class: '' , disabled:  ( this.viewProfile === 'admin' )},
      { path: '/categoria', title: 'Categoria',  icon:'ni-building text-pink', class: '' , disabled: ( this.viewProfile === 'admin' )},
      { path: '/provedor', title: 'Provedor',  icon:'ni-world text-pink', class: '' , disabled:( this.viewProfile === 'admin' )},
      { path: '/perfil', title: 'Roles',  icon:'ni-vector text-pink', class: '' , disabled:  ( this.viewProfile === 'admin' )},
      { path: '/logs', title: 'Logs',  icon:'ni-ui-04 text-pink', class: '' , disabled: ( this.viewProfile === 'admin' )},
  ];
    this.menuItems = ROUTES.filter(menuItem => menuItem.disabled === true );
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}

export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
    disabled: boolean;
}

export interface Fruit {
    color: string;
    id: string;
    estado: boolean;
    foto: string;
    listTallas: any;
  }
  export interface FacturaDto{
    id?:string;
    codigo?: string;
    fecha?:string;
    nombreCliente?:string;
    monto?:number;
    entrada?: number;
    provedor?: string;
    qr?:string;
    descripcion?:string;
    foto?:string;
    estado?: number;
    user?: string;
    tipoFactura?: number;
    asentado?: boolean;
    fechaasentado?: string;
    coinFinix?: boolean;
    check?: boolean;
    amountPass?: number;
    remaining?:number;
    passMoney?:number;
    passMoney2?:number;
  }

  export interface PeriodicElement {
    id:string;
    select: boolean;
    c_nombre: string;
    celular: string;
    celular2: string;
    p_pais: string;
    m_municipio: string;
    barrio: string;
    direccion: string;
    pares: number;
    guia_url: string;
  };

  export interface webOrdersDto {
    id:string;
    data: any;
    orders: string;
  }

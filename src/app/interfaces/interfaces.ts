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
  }

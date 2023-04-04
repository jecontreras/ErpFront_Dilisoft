import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloDialogComponent } from 'src/app/dialog/articulo-dialog/articulo-dialog.component';
import { ToolsService } from 'src/app/services/tools.service';
import { ArticuloService } from 'src/app/servicesComponent/articulo.service';
import { ReturnArticleService } from 'src/app/servicesComponent/return-article.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-return-article',
  templateUrl: './form-return-article.component.html',
  styleUrls: ['./form-return-article.component.scss']
})
export class FormReturnArticleComponent implements OnInit {

  data:any = {
    entrada: 2
  };
  id:any;
  titleBTN:string = "Guardar";
  listArticle:any = [];
  btnDisabled:boolean = false;
  disabledPrint:boolean = false;
  tablet:any = {
    headers:["Codigo", "Color", "Talla", "Plataforma", "Decisions", "Cantidad", "Precio Unitario", "Precio Total"],
    row:[],
    keys:["codigo","color","talla",'platform', 'decisions', "cantidad", "precioCompra", "precioTotal"]
  };

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _returnArticle: ReturnArticleService,
    private _article: ArticuloService,
    public dialog: MatDialog,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._returnArticle.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      this.tablet.row = _.map( this.data.listReturnArticle, ( row )=> {
        return {
          id: row.id,
          articulo: row.article,
          selectTalla: row.articleSize.id,
          nameTalla: row.articleSize.talla,
          selectColor: row.articleSize.id,
          nameColor: row.articleSize.codigo,
          codigo: row.articleSize.codigo,
          titulo: row.article.titulo,
          cantidad: row.amount,
          decisions: Number( row.decisions ),
          cantidadSelect: row.amount,
          precioCompra: row.price || row['article']?.precioCompra,
          eliminado: false,
          platform: row.platform,
          coin: row.coin
        }
      }) || []
      this.suma()
      console.log( this.data )
    });
  }

  openArticulo(){
    const dialogRef = this.dialog.open(ArticuloDialogComponent,{
      width: "50%",
      height: "800px",
      data: { datos: { ...this.data, entrada: 2 } }
    });

    dialogRef.afterClosed().subscribe( async ( result ) => {
      console.log(`Dialog result:`, result);
      const format= [];
      for( const item of result ) {
        format.push( {
          ... item,
          eliminado: false,
          articulo: item.id,
          id: ""
         })
      }
      this.tablet.row.push( ...( format || [] ) );
      this.suma()
    });
  }

  submit(){
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    if( this.id ) this.updateFun();
    else this.crearFun();
    this.btnDisabled = false;
  }

  updateFun(){
    return new Promise( resolve =>{
      if( !this.id ) return resolve( false );
      let data:any = {
        listArticle: this.tablet.row,
        ...this.data
      };
      this._returnArticle.update( data ).subscribe(( res:any )=>{
        this._tools.basic("Actualizado exitoso");
        resolve( true );
      },()=> resolve( false ));
    });
  }
  crearFun(){
    return new Promise( resolve =>{
      let data = {
        listArticle: this.tablet.row,
        actions: this.data
      }
      this._returnArticle.create( data ).subscribe(( res:any )=>{
        this._tools.basic("Creado exitoso")
        res = res.data || {};
        this.id = res.id;
        console.log("***", res, this.id )
        this.data.id = this.id;
        this.titleBTN= "Actualizar";
        this._router.navigate(['/formreturnarticle', this.id ] );
        resolve( true );
      },()=> resolve( false ));
    });
  }

  settlingModule(){
    if( this.btnDisabled ) return false;
    if( !this.id ) return false;
    this.btnDisabled = true;
    this._returnArticle.settlingFct( { id: this.id } ).subscribe( res => {
      this._tools.basic( "Asentado Devolucion completado !!!" );
      this.btnDisabled = false;
      this.data.asentado = true;
    }, ( )=> { this._tools.basic( "Error en el servidor"); this.btnDisabled = false; } );
  }

  suma( ){
    this.data.monto = 0;
    this.data.cantidadPares = 0;
    for( let row of this.tablet.row ){
      console.log("***334", row)
      this.data.cantidadPares+= Number( row.cantidadSelect );
      if( ( !row.precioTotal )  ) row.precioTotal = 0;
      if( row.platform == 'dropshipping') { row.coin = row.precioShipping; row.precioTotal= row.precioShipping * ( Number( row.cantidadSelect ) || 0 ) ;}
      if( row.platform == 'arley') { row.coin = row.precioArley; row.precioTotal= row.precioArley * ( Number( row.cantidadSelect ) || 0 ) ;}
      if( row.platform == 'yurylocal') { row.coin = row.precioClienteDrop; row.precioTotal= row.precioClienteDrop * ( Number( row.cantidadSelect ) || 0 ) ;}
      if( row.platform == 'yurypermitido') { row.coin = row.precioOtras; row.precioTotal= row.precioOtras * ( Number( row.cantidadSelect ) || 0 ) ;}
      if( row.platform == 'lokomproaqui') { row.coin = row.precioLokompro; row.precioTotal= row.precioLokompro * ( Number( row.cantidadSelect ) || 0 ) ;}

      this.data.monto+= row.precioTotal;
    }
   }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnArticleService } from 'src/app/servicesComponent/return-article.service';

@Component({
  selector: 'app-return-article',
  templateUrl: './return-article.component.html',
  styleUrls: ['./return-article.component.scss']
})
export class ReturnArticleComponent implements OnInit {

  _dataConfig:any = {
    titulo: "Lista de Acciones",
    returnHTML: "formreturnarticle/",
    dsAccion: true,
    model: "",
    querys:{
      where:{
        estado: 0
      }
    },
    btn:{
      btnCrear: {
        titulo: "Crear Provedor",
        click: "handleActions()"
      }
    },
    tablet:{
      headers:["Select","Titulo","Celular","Creado","Actualizado"],
      row:[],
      keys: ["select","titulo", "celular","createdAt","updatedAt"]
    }
  };

  constructor(
    private _returnArticle: ReturnArticleService,
    private _router: Router,
  ) {
    this._dataConfig.model =  _returnArticle;
  }

  ngOnInit(): void {
  }

  handleActions(){
    this._router.navigate(['/formreturnarticle']);
  }

}

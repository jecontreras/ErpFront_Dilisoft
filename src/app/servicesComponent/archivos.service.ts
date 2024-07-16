import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(
    private _model: ServiciosService
  ) { }

  create(query:any){
    //this.FileFirebase( query );
    return this._model.querys2('archivos/file',query, 'post');
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}

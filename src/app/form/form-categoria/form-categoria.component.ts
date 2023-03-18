import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { CategoriaService } from 'src/app/servicesComponent/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {
  
  data:any = {};
  id:any;
  titleBTN:string = "Guardar";
  listCategoria:any = [];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredTallas: Observable<string[]>;
  listTallas: string[] = ['36','37', '38', '39', '40', '41', '42', '43','44'];
  alllistTallas: string[] = ['34','35','36','37', '38', '39', '40', '41', '42', '43','44'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _categoria: CategoriaService
  ) { }

  ngOnInit(): void {
    this.id = ( this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getData();
    this.getCategoria();
  }

  getCategoria(){
    this._categoria.get( { where: {
      categoriaPadre:null,
      estado: 0
     }, limit: 1000 } ).subscribe(( res:any )=>{
      this.listCategoria = res.data;
      console.log(this.listCategoria)
    });
  }

  getData(){
    this.titleBTN = "Actualizar";
    this._categoria.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      this.data = res || {};
      this.listTallas = this.data.listSizes || [];
      console.log( this.data )
    });
  }

  submit(){
    this.data.listSizes = this.listTallas || [];
    if( this.id ) this.updateFun();
    else this.crearFun();
  }

  updateFun(){
    let data:any = this.data;
    this._categoria.update( data ).subscribe(( res:any )=>{
      this._tools.basic("Actualizado exitoso");
    });
  }
  crearFun(){
    let data = this.data
    this._categoria.create( data ).subscribe(( res:any )=>{
      this._tools.basic("Creado exitoso")
      this.id = res.id;
      this.data.id = this.id;
      this.titleBTN= "Actualizar";
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.listTallas.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.listTallas.indexOf(fruit);

    if (index >= 0) {
      this.listTallas.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.listTallas.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

}

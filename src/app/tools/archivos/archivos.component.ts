import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ArchivosService } from 'src/app/servicesComponent/archivos.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss']
})
export class ArchivosComponent implements OnInit {
  
  @Input() _dataConfig: any = {
    files: [],
  };
  files: File[] = [];
  listComplete:any = [];
  
  constructor(
    private _archivos: ArchivosService,
    private _tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  fileSubmit(row) {
    return new Promise(resolve => {
      let form: any = new FormData();
      form.append('file', row);
      this._tools.ProcessTime({});
      //this._archivos.create( this.files[0] );
      this._archivos.create(form).subscribe(async (res: any) => {
        this.listComplete.push( res.files );
        this._tools.presentToast("Subido exitoso!!");
        resolve( res.files );
      });
    });
  }

}

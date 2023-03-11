import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-check-code-print',
  templateUrl: './check-code-print.component.html',
  styleUrls: ['./check-code-print.component.scss']
})
export class CheckCodePrintComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CheckCodePrintComponent>,
  ) { }

  ngOnInit(): void {
  }

  seleccionado(){
    this.close();
  }

  close(){
    this.dialogRef.close([]);
  }

}

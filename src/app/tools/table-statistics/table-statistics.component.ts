import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

export interface StatisticElement {
  idArticulo?: string;
  cantidad?: number;
  precio?: number;
  articuloTalla?: any;
  index?: number;
  nombreCliente?: string;

}

const ELEMENT_DATA: StatisticElement[] = [];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-table-statistics',
  templateUrl: './table-statistics.component.html',
  styleUrls: ['./table-statistics.component.scss']
})
export class TableStatisticsComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  @Input() dataTable: StatisticElement[];
  @Input() dataLayout: string[];

  constructor(
    public _tools: ToolsService
  ) {
  }

  ngOnInit(): void {
    console.log("***31", this.dataTable, "#######", this.dataLayout)
  }

}

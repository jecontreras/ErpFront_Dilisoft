import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
  styleUrls: ['./table-statistics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableStatisticsComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;


  @Input() dataTable: StatisticElement[];
  @Input() dataLayout: string[] = [];
  @Input() countSum:number = 0;
  @Input() view = 'one';

  columnsToDisplayWithExpand = []
  expandedElement: StatisticElement | null;

  constructor(
    public _tools: ToolsService
  ) {
  }

  ngOnInit(): void {
    console.log("***31", this.dataTable, "#######", this.dataLayout)
    this.columnsToDisplayWithExpand = [...this.dataLayout, 'expand'];
  }

}

import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicesComponent/factura.service';
import { StatisticElement } from 'src/app/tools/table-statistics/table-statistics.component';
import * as moment from 'moment';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  dataTable:StatisticElement[] = [];
  dataTable2:StatisticElement[] = [];
  dataTable3:StatisticElement[] = [];

  dataLayout:string[] = ['Position', 'Codigo', 'Cantidad', 'Valor'];
  dataLayout3:string[] = ['Position', 'nombreCliente', 'precio'];
  filter:any = {
    date1: moment().add(-1,'days').format("YYYY-MM-DD"),
    date2: moment().format("YYYY-MM-DD")
  };
  dataUser:any = {};
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  querys:any = {
    fecha1: this.filter.date1, fecha2: this.filter.date2, user: this.dataUser.id
  };
  hoveredDate: NgbDate | null = null;

  modelDate: NgbDateStruct;
	date: { year: number; month: number };
  view:string = "dateOne";
  countSum1:number = 0;
  countSum2:number = 0;
  countSum3:number = 0;

  constructor(
    private _factura: FacturaService,
    private _tools: ToolsService,
    private _store: Store<USER>,
    private calendar: NgbCalendar
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
  }

  async ngOnInit() {
    this.selectToday();
    await this.getStatistic();
    await this.getPlatform();
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

  async filterTxt(){
    let fecha1 = String(this.fromDate.year) + "-" + String(this.fromDate.month) + "-" +String(this.fromDate.day);
    let fecha2 = String(this.toDate.year) +"-"+ String(this.toDate.month) + "-"+ String(this.toDate.day);
    this.querys.fecha1 = moment( fecha1 ).format();
    this.querys.fecha2 = moment( fecha2 ).format();
    this.filter.date1 = this.querys.fecha1;
    this.filter.date2 = this.querys.fecha2;
    this.dataTable = [];
    this.dataTable2 = [];
    this.dataTable3 = [];
    await this.getStatistic();
    await this.getPlatform();
  }

  async filterTxtDateOne(){
    this.querys.date = moment( String(this.modelDate.year) + "-" + String(this.modelDate.month) + "-" +String(this.modelDate.day) ).format("YYYY-MM-DD");
    this.filter.date = this.querys.date;
    this.dataTable = [];
    this.dataTable2 = [];
    this.dataTable3 = [];
    await this.getStatistic();
    await this.getPlatform();
  }

  isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

  selectToday() {
		this.modelDate = this.calendar.getToday();
    this.filter.date = moment( String(this.modelDate.year) + "-" + String(this.modelDate.month) + "-" +String(this.modelDate.day) ).format("YYYY-MM-DD");
	}

  getStatistic(){
    return new Promise( resolve => {
      this._factura.getStatistics( this.querys ).subscribe( res => {
        let count = 0;
        this.dataTable2 = _.orderBy( res.data, ['cantidad'],['ASC']);
        for( let row of res.data ) { count++; row.index = count; this.countSum1+=row.precio; this.countSum2+=row.precio; }
        this.dataTable = res.data;
        resolve( true );
      },( )=> resolve( false ) );
    });
  }

  getPlatform(){
    return new Promise( resolve => {
      this.querys.user = this.dataUser.id;
      this._factura.getstatisticsBillPlatform( this.querys ).subscribe( res => {
        let count = 0;
        for( let row of res.data ) { count++; row.index = count; this.countSum3+=row.precio;}
        this.dataTable3 = res.data;
        resolve( true );
      },( )=> resolve( false ) );
    });
  }

  hnadlePrint(){
    this._tools.print();
  }

}

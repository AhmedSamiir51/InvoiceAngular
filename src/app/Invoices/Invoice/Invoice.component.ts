import { InvoiceService } from './../../Service/Invoice/invoice.service';
import { DeleteComponent } from './delete/delete.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import * as XLSX from 'xlsx';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { Data } from '@angular/router';
import {  InvoiceData } from 'src/app/Service/Invoice/invoice';


@Component({
  selector: 'app-Invoice',
  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.css']
})
export class ClientComponent implements OnInit {
  Filter=true;

  CustomerName=false;
  Date=false;
  Serial=false;
  note=false;
  fileName= 'ExcelSheet.xlsx';

  @ViewChild(MatPaginator) paginator?: MatPaginator;


  Datasource: any =new MatTableDataSource
  displayedColumns: string[] = ['id','Serial','CustomerName','Date','note', 'Action']
  constructor(  public dialog: MatDialog , private service:InvoiceService ) { }

  ngOnInit(): void {
    this.getAllInvoice()
  }

  AfterViewInit(){
  }

  getAllInvoice(){
    this.service.GetAllInvoices().subscribe(e => {this.Datasource = new MatTableDataSource(e) ;
      this.Datasource.paginator = this.paginator;
    },er=>{console.log(er)})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Datasource.filter = filterValue.trim().toLowerCase();
    if (this.Datasource.paginator) {
      this.Datasource.paginator?.firstPage();
    }
  }



  startEdit( InvoiceID:number,CustomerName:string,Notes:string, Serial:number,Date?:Data){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {InvoiceID: InvoiceID, CustomerName: CustomerName, Notes: Notes, Serial: Serial, Date: Date}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllInvoice()

    });

  }

  addNew() {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {issue: InvoiceData }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllInvoice()
    });
  }

  deleteItem( InvoiceID:number,CustomerName:string,Notes:string, Serial:number,Date?:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {InvoiceID: InvoiceID, CustomerName: CustomerName, Notes: Notes, Serial: Serial, Date: Date}
    });
    dialogRef.afterClosed().subscribe(result => {
    this.getAllInvoice()
    });
  }


  exportexcel()
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  Filters(){
    this.Filter = !this.Filter

    }

    checked(){
    this.CustomerName = !this.CustomerName
    }

    checked2(){
      this.Serial = !this.Serial
    }

    checked3(){
      this.note = !this.note
    }


    checked4(){
      this.Date = !this.Date
    }

    Print(){
      window.print()
    }


}

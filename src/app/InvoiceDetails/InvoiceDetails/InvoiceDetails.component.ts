import { InvoiceDetailsService } from '../../Service/InvoiceDetails/invoice-details.service';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-InvoiceDetails',
  templateUrl: './InvoiceDetails.component.html',
  styleUrls: ['./InvoiceDetails.component.css']
})
export class CallComponent implements OnInit {
  Filter=true;
  CustomerName=false;
  ProductName=false;
  Qty=false;
  Price=false;
  listss: any =new MatTableDataSource
  displayedColumns: string[] = ['CustomerName','ProductName','Qty','Price','Action']
  fileName= 'ExcelSheet.xlsx';

 @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor( public ar:ActivatedRoute, public dialog: MatDialog ,private service:InvoiceDetailsService ) { }

  ngOnInit(): void {

    this.refresh()
  }

  refresh() {
    this.service.getInvoiceDetails(this.ar.snapshot.params["id"]).subscribe(e=>{this.listss = new MatTableDataSource(e) ;
      this.listss.paginator = this.paginator;},er=>{console.log(er)})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listss.filter = filterValue.trim().toLowerCase();
    if (this.listss?.paginator) {
      this.listss.paginator?.firstPage();
    }
  }


  addNew(InvoiceID?:number,ProductID?:number,Qty?:string,Price?:string) {
    InvoiceID=this.ar.snapshot.params["id"]
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {InvoiceID: InvoiceID, ProductID: ProductID, Qty: Qty, Price: Price}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });

  }


  deleteItem( InvoiceID:number,ProductID:number,CustomerName:string,ProductName:string,Qty:number, Price:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {InvoiceID: InvoiceID, ProductID: ProductID, CustomerName: CustomerName, ProductName: ProductName, Price: Price, Qty: Qty}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
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

  Print(){
    window.print();
  }

  checked(){
    this.CustomerName = !this.CustomerName
  }

  checked2(){
    this.ProductName = !this.ProductName
  }

  checked3(){
    this.Qty = !this.Qty
  }

  checked4(){
    this.Price = !this.Price
  }

}

import { InvoiceDetailsService } from './../../../Service/InvoiceDetails/invoice-details.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: InvoiceDetailsService) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteInvoiceDetails(this.data.InvoiceID,this.data.ProductID).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dialogRef.close();
  }


}

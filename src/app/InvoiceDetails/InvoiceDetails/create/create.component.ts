import { InvoiceDetailsService } from './../../../Service/InvoiceDetails/invoice-details.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: InvoiceDetailsService  , public ar:ActivatedRoute) { }


    product:any[]=[]

  ngOnInit(): void {
    this.dataService.GetAllProduct().subscribe(e=>{ this.product=e},er=>{console.log(er);})
    console.log(this.data.InvoiceID );
  }


  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  public confirmAdd(): void {
   console.log( this.data);
    this.dataService.addInvoiceDetails(this.data).subscribe(e=>{console.log(e);},er=>{console.log(er)});
    this.dialogRef.close();

  }





}

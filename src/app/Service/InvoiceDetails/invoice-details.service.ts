import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../Invoice/invoice';
import { InvoiceDetails } from './invoice-details';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  constructor(public http:HttpClient  ) { }
  baseurl=environment.baseUrl

  GetAllInvoiceDetails( ){
    return this.http.get<InvoiceDetails[]>(this.baseurl+"/InvoiceDetails")
  }



  GetAllProduct(){
    return this.http.get<Product[]>(this.baseurl+"/InvoiceDetails/ProductList")
  }


  addInvoiceDetails(body:any){
    return this.http.post<InvoiceDetails>(this.baseurl+"/InvoiceDetails",body)
  }

  getInvoiceDetails(i:number){
    return this.http.get<InvoiceDetails[]>(this.baseurl+"/InvoiceDetails/"+i)
  }

  deleteInvoiceDetails(id:number,i:number){
    console.log(id ,"invoice id  " , i ,"product id ");
    return this.http.delete(this.baseurl+"/InvoiceDetails/DeleteInvoiceDetail?id="+id+"&i="+i)
  }
}

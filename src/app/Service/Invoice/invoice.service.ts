import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public http:HttpClient  ) { }
  baseurl=environment.baseUrl

  GetAllInvoices(){
    return this.http.get<Invoice[]>(this.baseurl+"/Invoice")
  }

  addInvoice(body:any){
    return this.http.post<Invoice>(this.baseurl+"/Invoice",body)
  }
  getInvoice(i:number){
    return this.http.get<Invoice>(this.baseurl+"/Invoice/"+i)
  }

  editInvoice(edit:Invoice){
    return this.http.put(this.baseurl+"/Invoice/"+edit.InvoiceID,edit)
  }


  deleteInvoice(id:number){
    return this.http.delete(this.baseurl+"/Invoice/"+id)
  }
}

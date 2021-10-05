
export interface Invoice {
  InvoiceID: number;
  Serial: number;
  Date: Date;
  CustomerName: string;
  Notes: string;
}


export class InvoiceData {

  constructor(public InvoiceID?:number,
    public CustomerName?:string,
    public Notes?:string,public Serial?:number,
    public Date?:Date) {

  }
}




export interface Product {
  ProductID: number;
  ProductName: string;
  Notes?: any;
}


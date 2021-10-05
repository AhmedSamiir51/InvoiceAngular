
export interface InvoiceDetails {
  InvoiceDetailID: number;
  InvoiceID: number;
  ProductID: number;
  Qty: number;
  Price: number;
}

export class InvoiceDetails {


  constructor(public InvoiceDetailID :number ,
    public InvoiceID :number ,public ProductID :number,
    public Qty :number ,public Price :number ){}

}

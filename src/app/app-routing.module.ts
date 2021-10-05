
import { CallComponent } from './InvoiceDetails/InvoiceDetails/InvoiceDetails.component';
import { ClientComponent } from './Invoices/Invoice/Invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",component:ClientComponent},

  {path:"home",component:ClientComponent},
  {path:"home/calls/:id",component:CallComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

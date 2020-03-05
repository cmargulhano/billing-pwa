import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBillingComponent } from './menu-billing.component';
import { CreateBillingComponent } from './invoice/create-invoice/create-invoice.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';

const routes: Routes = [
  {
    path: '',
    component: MenuBillingComponent
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent
  },
  {
    path: 'create-invoice',
    component: CreateBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBuilderRoutingModule {}

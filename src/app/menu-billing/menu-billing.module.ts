import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { MenuBuilderRoutingModule } from './menu-billing-routing.module';
import { MenuBillingComponent } from './menu-billing.component';
import { CreateBillingComponent } from './invoice/create-invoice/create-invoice.component';
import { BillingComponent } from './invoice/invoice.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { CustomerService } from 'src/services/customer.service';
import { InvoiceService } from 'src/services/invoice.service';

@NgModule({
  declarations: [
    MenuBillingComponent,
    BillingComponent,
    CreateBillingComponent,
    CustomerComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    MenuBuilderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CustomerService, InvoiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuBuilderModule {}

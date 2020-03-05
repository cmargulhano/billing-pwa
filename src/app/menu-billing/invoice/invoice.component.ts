import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Invoice } from 'src/models/invoice';
import { InvoiceService } from 'src/services/invoice.service';
import { SpinnerOverlayService } from 'src/utils/spinner/spinner-overlay.service';
import { SideNavActions } from '../menu-billing.component';
import { CustomerService } from 'src/services/customer.service';
import { Customer } from 'src/models/customer';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'invoice-component',
  templateUrl: 'invoice.component.html',
  styleUrls: ['invoice.component.scss']
})
export class BillingComponent implements OnInit {
  SideNavActions = SideNavActions;
  public displayedColumns: string[] = ['id', 'expirationDate', 'value'];
  public invoices: Invoice[] = [];
  public customers: Customer[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private spinner: SpinnerOverlayService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {}

  public ngOnInit() {
    this.loadInvoices();
    this.loadCustomers();
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public loadInvoices() {
    this.spinner.show();
    this.invoiceService
      .list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        invoices => {
          this.invoices = invoices;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
        }
      );
  }

  public filterByDate(event: any) {
    const date = event.srcElement.value;
    if (date == '') {
      this.loadInvoices();
      return;
    }
    this.spinner.show();
    this.invoiceService
      .findByExpirationDate(date)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        invoices => {
          this.invoices = invoices;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
        }
      );
  }

  public filterByCustomer(event: MatSelectChange) {
    const customerId = event.value;
    this.spinner.show();
    this.invoiceService.findByCustomer(customerId).subscribe(
      invoices => {
        this.invoices = invoices;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
      }
    );
  }

  public edit(invoice: Invoice) {
    this.router.navigate(['billing/create-invoice'], {
      state: { invoice: invoice }
    });
  }

  private loadCustomers() {
    this.customerService.list().subscribe(customers => {
      this.customers = customers;
    });
  }
}

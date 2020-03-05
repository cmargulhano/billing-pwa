import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerOverlayService } from 'src/utils/spinner/spinner-overlay.service';
import { SideNavActions } from '../menu-billing.component';
import { CustomerService } from 'src/services/customer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/models/customer';

@Component({
  selector: 'customer-component',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {
  SideNavActions = SideNavActions;
  public displayedColumns: string[] = ['id', 'fullName'];
  public customers: Customer[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private spinner: SpinnerOverlayService,
    private customerService: CustomerService
  ) {}

  public ngOnInit() {
    this.spinner.show();
    this.customerService
      .list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        customers => {
          this.customers = customers;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
        }
      );
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public edit(customer: Customer) {
    this.router.navigate(['billing/create-customer'], {
      state: { customer: customer }
    });
  }
}

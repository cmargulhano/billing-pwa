import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from 'src/models/customer';
import { Invoice } from 'src/models/invoice';
import { CustomerService } from 'src/services/customer.service';
import { InvoiceService } from 'src/services/invoice.service';
import { MyErrorStateMatcher } from 'src/utils/error-state-matcher';
import { SpinnerOverlayService } from 'src/utils/spinner/spinner-overlay.service';

@Component({
  selector: 'create-invoice',
  templateUrl: 'create-invoice.component.html',
  styleUrls: ['create-invoice.component.scss']
})
export class CreateBillingComponent implements OnInit {
  public frm: FormGroup;
  public competencyDateFormControl = new FormControl('', [Validators.required]);
  public expirationDateFormControl = new FormControl('', [Validators.required]);
  public paymentDateFormControl = new FormControl('', [Validators.required]);
  public valueFormControl = new FormControl('', [Validators.required]);
  public customerFormControl = new FormControl('', [Validators.required]);
  public invoice: Invoice;
  public matcher = new MyErrorStateMatcher();
  public customers: Customer[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: SpinnerOverlayService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {}

  public ngOnInit() {
    this.loadCustomers();
    if (history.state && history.state['invoice']) {
      this.invoice = history.state['invoice'];
      this.competencyDateFormControl.setValue(this.invoice.competencyDate);
      this.expirationDateFormControl.setValue(this.invoice.expirationDate);
      this.paymentDateFormControl.setValue(this.invoice.paymentDate);
      this.valueFormControl.setValue(this.invoice.value);
    }
    this.frm = this.formBuilder.group({
      competencyDate: this.competencyDateFormControl,
      expirationDate: this.expirationDateFormControl,
      paymentDate: this.paymentDateFormControl,
      value: this.valueFormControl,
      customer: this.customerFormControl
    });
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public get formControls() {
    return this.frm.controls;
  }

  public back() {
    this.router.navigate(['/billing'], {
      queryParams: { index: 'list-invoice' }
    });
  }

  public save() {
    if (this.frm.invalid) {
      return;
    }

    if (!this.invoice) {
      this.invoice = {};
    }
    this.invoice.competencyDate = this.competencyDateFormControl.value;
    this.invoice.expirationDate = this.expirationDateFormControl.value;
    this.invoice.paymentDate = this.paymentDateFormControl.value;
    this.invoice.value = this.valueFormControl.value;
    const customerId = this.customerFormControl.value;

    this.spinner.show();
    this.invoiceService
      .save(this.invoice, customerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        value => {
          this.back();
          this.spinner.hide();
        },
        error => {
          this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
        }
      );
  }

  private loadCustomers() {
    this.spinner.show();
    this.customerService
      .list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(customers => {
        this.customers = customers;
        if (this.invoice) {
          this.invoiceService
            .getCustomer(this.invoice.id)
            .subscribe(customer => {
              this.customerFormControl.setValue(customer.id);
            });
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide('COMMONS.MSG.ERROR_GENERIC');
      });
  }
}

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
import { CustomerService } from 'src/services/customer.service';
import { MyErrorStateMatcher } from 'src/utils/error-state-matcher';
import { SpinnerOverlayService } from 'src/utils/spinner/spinner-overlay.service';

@Component({
  selector: 'create-customer',
  templateUrl: 'create-customer.component.html',
  styleUrls: ['create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  public frm: FormGroup;
  public nameFormControl = new FormControl('', [Validators.required]);
  public birthDateFormControl = new FormControl('', [Validators.required]);
  public genderFormControl = new FormControl('', [Validators.required]);
  public phoneNumberFormControl = new FormControl('', [Validators.required]);
  public mobileNumberFormControl = new FormControl('', [Validators.required]);
  public customer: Customer;
  public matcher = new MyErrorStateMatcher();
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private spinner: SpinnerOverlayService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  public ngOnInit() {
    if (history.state && history.state['customer']) {
      this.customer = history.state['customer'];
      this.nameFormControl.setValue(this.customer.fullName);
      this.birthDateFormControl.setValue(this.customer.birthDate);
      this.genderFormControl.setValue(this.customer.gender);
      this.phoneNumberFormControl.setValue(this.customer.phoneNumber);
      this.mobileNumberFormControl.setValue(this.customer.mobileNumber);
    }
    this.frm = this.formBuilder.group({
      fullName: this.nameFormControl,
      birthDate: this.birthDateFormControl,
      gender: this.genderFormControl,
      phone: this.phoneNumberFormControl,
      mobile: this.mobileNumberFormControl
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
      queryParams: { index: 'list-customer' }
    });
  }

  public save() {
    if (this.frm.invalid) {
      return;
    }

    if (!this.customer) {
      this.customer = {};
    }
    this.customer.fullName = this.nameFormControl.value;
    this.customer.birthDate = this.birthDateFormControl.value;
    this.customer.gender = this.genderFormControl.value;
    this.customer.phoneNumber = this.phoneNumberFormControl.value;
    this.customer.mobileNumber = this.mobileNumberFormControl.value;

    this.spinner.show();
    this.customerService
      .save(this.customer)
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
}

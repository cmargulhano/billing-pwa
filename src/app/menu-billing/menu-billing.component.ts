import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export enum SideNavActions {
  LIST_CUSTOMER = 'list-customer',
  LIST_INVOICE = 'list-invoice',
}

@Component({
  selector: 'app-billing',
  templateUrl: './menu-billing.component.html',
  styleUrls: ['./menu-billing.component.scss']
})
export class MenuBillingComponent implements OnInit {
  SideNavActions = SideNavActions;
  public opened: boolean;
  public index: string = SideNavActions.LIST_CUSTOMER;
  public collapsed: boolean = true;
  public filterCategory: string;
  public filterItem: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit() {
    setTimeout(() => {
      this.opened = true;
    }, 100);
    this.route.queryParams.subscribe(params => {
      if (params['index']) {
        if (params['index'] == 'list-invoice') {
          this.index = SideNavActions.LIST_INVOICE;
        } else if (params['index'] == 'list-customer') {
          this.index = SideNavActions.LIST_CUSTOMER;
        }
      } else {
        this.index = SideNavActions.LIST_CUSTOMER;
      }
    });
  }

  public select(index: SideNavActions) {
    this.index = index;
    this.router.navigate(['/billing'], {
      queryParams: { index: index }
    });
  }

  public back() {
    this.router.navigate(['/home']);
  }

  public toogle() {
    this.collapsed = !this.collapsed;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Invoice } from 'src/models/invoice';
import { Customer } from 'src/models/customer';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<Invoice[]> {
    return this.httpClient
      .get(`${environment.url}/invoices`)
      .pipe(map(data => data['_embedded']['invoices']));
  }

  getCustomer(id: string): Observable<Customer> {
    return this.httpClient.get(`${environment.url}/invoices/${id}/customer`);
  }

  save(invoice: Invoice, customerId: string) {
    invoice.customer = `http://localhost:8080/customers/${customerId}`;
    return this.httpClient.post(`${environment.url}/invoices`, invoice);
  }

  findByExpirationDate(date: string): Observable<Invoice[]> {
    return this.httpClient
      .get(
        `${environment.url}/invoices/search/findAllByExpirationDate?expirationDate=${date}`
      )
      .pipe(map(data => data['_embedded']['invoices']));
  }

  findByCustomer(customerId: string): Observable<Invoice[]> {
    return this.httpClient
      .get(`${environment.url}/customers/${customerId}/invoices`)
      .pipe(map(data => data['_embedded']['invoices']));
  }
}

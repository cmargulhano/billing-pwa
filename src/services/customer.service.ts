import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/models/customer';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  list(): Observable<Customer[]> {
    return this.httpClient
      .get(`${environment.url}/customers`)
      .pipe(map(data => data['_embedded']['customers']));
  }

  save(customer: Customer) {
    return this.httpClient.post(`${environment.url}/customers`, customer);
  }
}

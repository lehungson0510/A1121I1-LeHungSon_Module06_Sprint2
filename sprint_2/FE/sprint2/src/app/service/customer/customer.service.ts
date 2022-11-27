import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICustomer} from '../../model/customer/ICustomer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly API_URL: string = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {
  }

  // findAllCart(): Observable<ICart[]> {
  //   return this.httpClient.get<ICart[]>(this.URI + '/list-cart');
  // }

  findCustomerByAccountId(accountId: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.API_URL + '/getCustomerByAccount?id=' + accountId);
  }
}

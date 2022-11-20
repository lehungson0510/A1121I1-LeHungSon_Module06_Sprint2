import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICartBook} from '../../model/cart/ICartBook';
import {ICart} from '../../model/cart/ICart';
import {IBook} from '../../model/book/IBook';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly API_URL = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {
  }

  getCartBookList(id: number): Observable<ICartBook[]> {
    return this.http.get<ICartBook[]>(this.API_URL + '/cart-book-list/' + id);
  }

  updateQuantityCart(cartBook: ICartBook): Observable<void> {
    return this.http.put<void>(this.API_URL + '/update-quantity', cartBook);
  }

  addBook(accountId: number, book: IBook): Observable<void> {
    return this.http.post<void>(this.API_URL + '/add-book?accountId=' + accountId, book);
  }

  deleteBookCart(cartId: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + '/cart-delete?cardId=' + cartId);
  }

  paymentCart(cartList: ICart[]): Observable<void> {
    return this.http.put<void>(this.API_URL + '/payment', cartList);
  }

  deleteManyBookCart(cartId: number[]): Observable<void> {
    return this.http.post<void>(this.API_URL + '/delete-many-book-cart/' , cartId);
  }

}

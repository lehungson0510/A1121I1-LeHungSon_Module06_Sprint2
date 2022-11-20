import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/IBook';
import {ICart} from '../../model/cart/ICart';
import {ICartBook} from '../../model/cart/ICartBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly API_URL = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {
  }

  getBookSlide(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/slide');
  }

  getBookList(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/list?page=' + page);
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.API_URL + '/book-user/no-login/detail/' + id);
  }

  getBookSameAuthor(idAuthor: number, idBook: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/same-author?idAuthor=' + idAuthor + '&idBook=' + idBook);
  }

  getBookBestSale(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/best-sale');
  }

  getBookByCategory(idCategory: number, page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/find-book-by-category/' + idCategory + '?page=' + page);
  }

  getBookByName(name: string, page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/find-book-by-name?name=' + name + '&page=' + page);
  }

  getBookSaleSpecial(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/sale-special?page=' + page);
  }

  editBook(id: number, book: IBook): Observable<void> {
    return this.http.patch<void>(this.API_URL + '/edit' + id, book);
  }

  getBestSeller(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/book-user/no-login/best-seller?page=' + page);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + '/delete/' + id);
  }
}

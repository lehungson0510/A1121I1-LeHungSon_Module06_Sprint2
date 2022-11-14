import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBook} from '../../model/book/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly API_URL = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {
  }

  getBookSlide(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/slide');
  }

  getBookList(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/list?page=' + page);
  }

  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.API_URL + '/detail/' + id);
  }

  getBookSameAuthor(idAuthor: number, idBook: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/same-author?idAuthor=' + idAuthor + '&idBook=' + idBook);
  }

  getBookBestSale(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/best-sale');
  }

  getBookByCategory(idCategory: number, page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/find-book-by-category/' + idCategory + '?page=' + page);
  }

  getBookByName(name: string, page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/find-book-by-name?name=' + name + '&page=' + page);
  }

  getBookSaleSpecial(page: number): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/sale-special?page=' + page);
  }
}

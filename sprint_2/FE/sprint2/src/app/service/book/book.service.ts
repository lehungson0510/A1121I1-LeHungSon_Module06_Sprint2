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

  getBookList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL + '/list');
  }
}

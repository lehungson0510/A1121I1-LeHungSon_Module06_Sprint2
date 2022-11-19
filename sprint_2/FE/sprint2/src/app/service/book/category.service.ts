import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from '../../model/book/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly API_URL = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {

  }

  findAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.API_URL + '/book-user/no-login/category');
  }

}

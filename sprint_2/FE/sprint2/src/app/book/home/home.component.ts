import {Component, OnInit} from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {BookService} from '../../service/book/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listBookSlide: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  listBook: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  constructor(private bookService: BookService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getBookSlide();
    this.getBookList();
  }

  getBookSlide() {
    this.bookService.getBookSlide().subscribe(
      (data) => {
        this.listBookSlide = data;
      }
    );
  }

  getBookList() {
    this.bookService.getBookList().subscribe(
      (data) => {
        this.listBook = data;
        console.log(data);
      }
    );
  }
}

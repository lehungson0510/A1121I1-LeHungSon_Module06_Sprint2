import {Component, OnInit} from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bookDetail: IBook = {
    bookPromotionId: {},
    bookAuthorId: {},
    bookCategoryId: {}
  };

  bookDetailQuickView: IBook = {
    bookPromotionId: {},
    bookAuthorId: {},
    bookCategoryId: {}
  };

  bookSameAuthor: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  idBook: number;
  idAuthor: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.topFunction();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idBook = +param.get('id');
      this.findBookById(this.idBook);
    });
  }

  findBookById(idBook: number) {
    this.topFunction();
    this.bookService.getBookById(idBook).subscribe(
      (data) => {
        this.bookDetail = data;
        this.bookService.getBookSameAuthor(this.bookDetail.bookAuthorId.authorId, idBook).subscribe(
          (data1) => {
            this.bookSameAuthor = data1;
            console.log(this.bookSameAuthor);
          }
        );
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/error404');
        }
      });
  }

  getBookDetailQuickView(bookDetail: IBook) {
    this.bookDetailQuickView = bookDetail;
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 400;
  }
}

import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {CategoryService} from '../../service/book/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBook} from '../../model/book/IBook';
import {ICategory} from '../../model/book/ICategory';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  idCategory: number;

  bookSlide: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  bookDetail: IBook = {
    bookPromotionId: {},
    bookAuthorId: {},
    bookCategoryId: {}
  };

  page = 1;
  size: number;
  totalItems: number;

  bookList: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  categoryList: ICategory[] = [];

  category: ICategory;

  title = 'Tất cả sách';

  nameSearch = '';

  bookBestSale: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }];

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idCategory = +param.get('id');
      this.title = param.get('name');
      this.getBookSlide();
      // this.getBookList(this.page - 1);
      this.getBookByCategory(1);
      this.getAllCategory();
      this.getBestSale();
    });
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  topCategory() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 620;
  }

  getBookSlide() {
    this.bookService.getBookSlide().subscribe(
      (data) => {
        this.bookSlide = data;
      }
    );
  }

  getBookList(page: number) {
    this.page = page;
    this.bookService.getBookList(this.page - 1).subscribe(
      (data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
      }
    );
  }

  getBookDetail(bookDetail: IBook) {
    this.bookDetail = bookDetail;
    console.log(this.bookDetail.bookCategoryId.categoryName);
  }

  getAllCategory() {
    this.categoryService.findAllCategory().subscribe(
      (data) => {
        this.categoryList = data;
      }
    );
  }

  getBookByCategory(page: number) {
    this.page = page;
    this.bookService.getBookByCategory(this.idCategory, this.page - 1).subscribe(
      (data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
      },
      () => {},
      () => {
        this.topCategory();
      }
    );
  }

  getBestSale() {
    this.bookService.getBookBestSale().subscribe(
      (data) => {
        this.bookBestSale = data;
      }
    );
  }

  searchBookByName(name: string, page: number) {
    this.page = page;
    this.nameSearch = name;
    console.log(name);
    this.bookService.getBookByName(name, this.page - 1).subscribe(
      (data: any) => {
        this.bookList = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
      }
    );
  }

}

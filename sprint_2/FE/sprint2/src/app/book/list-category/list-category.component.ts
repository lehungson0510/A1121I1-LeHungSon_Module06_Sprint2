import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {CategoryService} from '../../service/book/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IBook} from '../../model/book/IBook';
import {ICategory} from '../../model/book/ICategory';
import {TokenStorageService} from '../../service/security/token-storage.service';

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

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUser = false;
  showAccountantBoard = false;
  showSellBoard = false;
  userName: string;

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,) {
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

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      // this.showAccountantBoard = this.roles.includes('ROLE_ACCOUNTANT');
      // this.showSellBoard = this.roles.includes('ROLE_SELL');

      console.log('roles: ' + this.roles);
    }
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  topCategory() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 641;
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
      },
      () => {},
      () => {
        this.topCategory();
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

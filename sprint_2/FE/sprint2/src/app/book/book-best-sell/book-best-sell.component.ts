import {Component, OnInit} from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {ICategory} from '../../model/book/ICategory';
import {BookService} from '../../service/book/book.service';
import {CategoryService} from '../../service/book/category.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {SecurityServiceService} from '../../service/security/security.service';
import {NotifierService} from 'angular-notifier';
import {CartService} from '../../service/cart/cart.service';

@Component({
  selector: 'app-book-best-sell',
  templateUrl: './book-best-sell.component.html',
  styleUrls: ['./book-best-sell.component.css']
})
export class BookBestSellComponent implements OnInit {
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

  bookBestSell: IBook[] = [{
    bookCategoryId: {},
    bookPromotionId: {},
    bookAuthorId: {}
  }
  ];

  categoryList: ICategory[] = [];

  category: ICategory;

  title = 'Sách bán chạy';

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
  userName: string;

  accountId : number;

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityServiceService,
              private notification: NotifierService,
              private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.topCategory();
    this.getBookSlide();
    this.getBookBestSellList(this.page - 1);
    // this.searchBookByName(this.nameSearch, 1);
    this.getAllCategory();
    this.getBestSale();

    this.accountId = this.tokenStorageService.getUser().account.accountId;
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

  getBookBestSellList(page: number) {
    this.page = page;
    this.bookService.getBestSeller(this.page - 1).subscribe(
      (data: any) => {
        this.bookBestSell = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
        this.topCategory();
      });
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

  getBookByCategory(category: ICategory, page: number) {
    this.title = category.categoryName;
    this.category = category;
    this.page = page;
    this.bookService.getBookByCategory(category.categoryId, this.page - 1).subscribe(
      (data: any) => {
        this.bookBestSell = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
      },
      () => {
      },
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

  // searchBookByName(name: string, page: number) {
  //   this.page = page;
  //   this.nameSearch = name;
  //   console.log(name);
  //   this.bookService.getBookByName(name, this.page - 1).subscribe(
  //     (data: any) => {
  //       this.bookList = data.content;
  //       this.size = data.size;
  //       this.totalItems = data.totalElements;
  //     }
  //   );
  // }
  // changeColor() {
  //   (document.querySelector('.pagination-previous') as HTMLElement).style.color = 'blue';
  //   (document.querySelector('.pagination-next') as HTMLElement).style.color = 'black';
  // }
  delete(book: IBook) {

  }

  // thêm sách vào giỏ hàng
  addBook(bookAdd: IBook) {
    bookAdd.bookQuantity = 1;
    this.cartService.addBook(this.accountId, bookAdd).subscribe(() => {
    }, (error) => {
      this.notification.notify('error', error.error);
    }, () => {
      this.notification.notify('success', 'Sách đã thêm vào Giỏ hàng');
      // this.router.navigateByUrl('/header', { skipLocationChange: true }).then(() => {
      //   this.router.navigateByUrl('/book/list');
      // });
    });
  }

}

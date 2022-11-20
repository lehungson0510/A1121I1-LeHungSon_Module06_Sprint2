import {Component, OnInit} from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {CartService} from '../../service/cart/cart.service';
import {NotifierService} from 'angular-notifier';

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

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUser = false;
  showAccountantBoard = false;
  showSellBoard = false;
  userName: string;

  accountId : number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService,
              private notification: NotifierService) {
  }

  ngOnInit(): void {
    this.topFunction();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idBook = +param.get('id');
      this.findBookById(this.idBook);
    });

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

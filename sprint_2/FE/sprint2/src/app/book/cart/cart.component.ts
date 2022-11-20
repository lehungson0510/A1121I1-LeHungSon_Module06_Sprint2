import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {ICartBook} from '../../model/cart/ICartBook';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CartService} from '../../service/cart/cart.service';
import {NotifierService} from 'angular-notifier';
import {ICart} from '../../model/cart/ICart';
import {IBook} from '../../model/book/IBook';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartForm: FormGroup;
  checkList: boolean[] = [];
  checkAll = false;
  money = 0.0;
  totalMoney = 0.0;
  totalMoneyPerProduct: number[] = [];

  cartBookList: ICartBook[] = [];
  page = 1;
  size: number;
  totalItems: number;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  accountId: number;

  cartBookDelete: ICartBook = {
    cartId: {},
    bookId: {}
  };

  quantityBook: number[] = [];

  idManyCartBook: number[] = [];

  cartPaymentList: ICart[] = [];

  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private notification: NotifierService) {
  }

  ngOnInit(): void {
    this.topFunction();
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.getCartBookList(this.accountId);
    this.cartForm = new FormGroup({
      quantity: new FormControl(1)
    });
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  topFunction2() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 330;
  }

  getCartBookList(id: number) {
    this.cartService.getCartBookList(id).subscribe(
      (data: ICartBook[]) => {
        this.cartBookList = data;
        for (let i = 0; i < this.cartBookList.length; i++) {
          this.checkList.push(false);
        }
        this.cartBookList.forEach((cartBook, index) => {
            this.totalMoneyPerProduct[index] = cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice - (cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice * cartBook.bookId.bookPromotionId.promotionPercent / 100);
            this.quantityBook[index] = cartBook.bookId.bookQuantity;
          }
        );
      });
  }

  // subBook(cartBook: ICartBook) {
  //   cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity - 1;
  //   this.cartService.updateQuantityCart(cartBook).subscribe(data => {
  //   }, () => {
  //   }, () => {
  //     this.getCartBookList(this.accountId);
  //     this.getTotalMoney();
  //   });
  // }
  //
  // addBook(cartBook: ICartBook) {
  //   cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity + 1;
  //   this.cartService.updateQuantityCart(cartBook).subscribe(data => {
  //   }, () => {
  //   }, () => {
  //     this.getCartBookList(this.accountId);
  //     this.getTotalMoney();
  //   });
  // }

  isAllChecked() {
    if (this.checkAll) {
      this.checkAll = false;
    } else {
      this.checkAll = true;
    }

    if (this.checkAll) {
      this.checkList.forEach((checked, index) => {
        this.checkList[index] = true;
      });
    } else {
      this.checkList.forEach((checked, index) => {
        this.checkList[index] = false;
      });
    }

    this.getTotalMoney();
  }

  isChecked(i: number) {
    if (this.checkList[i]) {
      this.checkList[i] = false;
    } else {
      this.checkList[i] = true;
    }
    this.getTotalMoney();
  }

  getTotalMoney() {
    this.cartService.getCartBookList(this.accountId).subscribe((data: ICartBook[]) => {
      this.cartBookList = data;
      this.cartBookList.forEach((check, index) => {
        if (this.checkList[index]) {
          this.money += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
            - (this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
              * (this.cartBookList[index].bookId.bookPromotionId.promotionPercent / 100));
        }
      });
      this.totalMoney = this.money;
      this.money = 0.0;
    });
  }

  changeQuantity(cartBook: ICartBook, quantity: any) {
    if (quantity <= 0) {
      quantity = 1;
    }
    if (quantity > cartBook.bookId.bookQuantity) {
      quantity = cartBook.bookId.bookQuantity;
    }
    cartBook.cartId.cartQuantity = quantity;
    this.cartService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.getCartBookList(this.accountId);
      this.getTotalMoney();
    });
  }

  showInfoCartDelete(cartBookDelete: ICartBook) {
    this.cartBookDelete = cartBookDelete;
  }

  delete(cartBookId: number) {
    console.log(cartBookId);
    this.cartService.deleteBookCart(cartBookId).subscribe(
      // this.cartService.deleteBookCart(cartBook.cartId.cartId).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.getCartBookList(this.accountId);
        this.notification.notify('success', 'Đã xóa sản phẩm');
        this.topFunction2();
      },
    );
  }

  deleteManyBookCart() {
    this.cartService.getCartBookList(this.accountId).subscribe((data: ICartBook[]) => {
      if (data.length > 0) {
        data.forEach((check, index) => {
          if (this.checkList[index]) {
            this.idManyCartBook[index] = check.cartId.cartId;
            this.cartService.deleteManyBookCart(this.idManyCartBook).subscribe(
              () => {
              },
              () => {
              },
              () => {
                this.getCartBookList(this.accountId);
                this.topFunction2();
              },
            );
          }
        });
      }
    });
    if (this.checkList)
    this.notification.notify('success', 'Đã xóa sản phẩm');
  }

  payment() {
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        this.cartPaymentList.push(this.cartBookList[index].cartId);
      }
    });

    this.cartService.paymentCart(this.cartPaymentList).subscribe(data => {
    }, () => {
    }, () => {
      this.notification.notify('success', 'Thanh toán thành công');
      window.location.assign('/cart');
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {ICartBook} from '../../model/cart/ICartBook';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';

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

  cartBook: ICartBook = {};


  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService) {
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

  getCartBookList(id: number) {
    this.bookService.getCartBookList(id).subscribe(
      (data: ICartBook[]) => {
        this.cartBookList = data;
        for (let i = 0; i < this.cartBookList.length; i++) {
          this.checkList.push(false);
        }
        this.cartBookList.forEach((cartBook, index) => {
          this.totalMoneyPerProduct[index] = cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice - (cartBook.cartId.cartQuantity * cartBook.bookId.bookPrice * cartBook.bookId.bookPromotionId.promotionPercent / 100);
        });
      }
    );
  }

  subBook(cartBook: ICartBook) {
    cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity - 1;
    this.bookService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.getCartBookList(this.accountId);
      this.getTotalMoney();
    });
  }

  addBook(cartBook: ICartBook) {
    cartBook.cartId.cartQuantity = cartBook.cartId.cartQuantity + 1;
    this.bookService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.getCartBookList(this.accountId);
      this.getTotalMoney();
    });
  }

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
    this.bookService.getCartBookList(this.accountId).subscribe((data: ICartBook[]) => {
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
    cartBook.cartId.cartQuantity = quantity;
    this.bookService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      this.getCartBookList(this.accountId);
      this.getTotalMoney();
    });
  }
}

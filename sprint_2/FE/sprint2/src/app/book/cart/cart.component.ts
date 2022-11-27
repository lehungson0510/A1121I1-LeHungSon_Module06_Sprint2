import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {ICartBook} from '../../model/cart/ICartBook';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CartService} from '../../service/cart/cart.service';
import {NotifierService} from 'angular-notifier';
import {ICart} from '../../model/cart/ICart';
import {render} from 'creditcardpayments/creditCardPayments';
import {HeaderComponent} from '../../layout/header/header.component';
import {CustomerService} from '../../service/customer/customer.service';
import {ICustomer} from '../../model/customer/ICustomer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartForm: FormGroup;
  checkList: boolean[] = [];
  checkAll = false;
  moneyAfterPromote = 0.0;
  moneyBeforePromote = 0.0;
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

  quantityBookDelete: number[] = [];

  paymentPayPal: any;

  customer: ICustomer = {};

  totalMoneyBeforePromotion: number;
  totalMoneyAfterPromotion: number;

  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private customerService: CustomerService,
              private notification: NotifierService,
              private headerComponent: HeaderComponent) {

    this.paymentPayPal = render(
      {
        id: '#myPayPal',
        currency: 'USD',
        value: this.totalMoney.toString(),
        onApprove: (details) => {
          this.notification.notify('success', 'Thanh toán thành công');
          this.payment();
        }
      }
    );
  }

  ngOnInit(): void {
    //

    // window.paypal.Buttons({
    //   createOrder(data, actions) {
    //     return actions.order.create({
    //       payer: {
    //         address: {
    //           address_line_1: 'Thừa Thiên Huế',
    //           address_line_2: 'Thừa Đà Nẵng'
    //         },
    //
    //         email_address: 'a@gmail.com',
    //         phone: {
    //           phone_type: 'MOBILE',
    //           phone_number: {
    //             national_number: '0123456789'
    //           }
    //         }
    //       },
    //       purchase_units: [{
    //         amount: {
    //           value: '123',
    //           currency_code: 'USD'
    //         }
    //       }]
    //     });
    //   }
    // }).render('#myPayPal');

    // const totalMoney1 = this.getTotalMoney();
    // window.paypal.Buttons(
    //   {
    //     style: {
    //       layout: 'horizontal',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal'
    //     },
    //     createOrder(data, actions) {
    //       return actions.order.create({
    //         purchase_units: [{
    //           amount: {
    //             value: totalMoney1.toString(),
    //             currency_code: 'USD'
    //           }
    //         }]
    //       });
    //     }
    //   }).render('#myPayPal');

    this.topFunction();
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.getCartBookList(this.accountId);
    this.getTotalMoney();
    this.customerService.findCustomerByAccountId(this.accountId).subscribe(
      (data) => this.customer = data
    );
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
          this.moneyAfterPromote += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
            - (this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity
              * (this.cartBookList[index].bookId.bookPromotionId.promotionPercent / 100));

          this.moneyBeforePromote += this.cartBookList[index].bookId.bookPrice * this.cartBookList[index].cartId.cartQuantity;
        }
      });
      this.totalMoney = this.moneyAfterPromote;
      this.totalMoneyAfterPromotion = this.moneyBeforePromote - this.totalMoney;
      this.moneyAfterPromote = 0.0;
      this.moneyBeforePromote = 0.0;
    });
  }

  changeQuantity(cartBook: ICartBook, quantity: any) {
    this.showInfoCartDelete(cartBook);
    if (quantity <= 0) {
      quantity = 1;
      (document.getElementById('delete') as HTMLFormElement).click();
    }
    // if (quantity === 0) {
    //   this.showInfoCartDelete(cartBook);
    //   const container = document.getElementById('container');
    //   const button = document.createElement('input');
    //   button.type = 'button';
    //   button.style.display = 'none';
    //   button.setAttribute('data-toggle', 'modal');
    //   button.setAttribute('data-target', '#deleteCart');
    //   container.appendChild(button);
    //   button.click();
    // }
    if (quantity > cartBook.bookId.bookQuantity) {
      this.notification.notify('error', 'Không đủ số lượng. Vui lòng thử lại sau');
      quantity = cartBook.bookId.bookQuantity;
    }
    cartBook.cartId.cartQuantity = quantity;
    this.cartService.updateQuantityCart(cartBook).subscribe(data => {
    }, () => {
    }, () => {
      // this.headerComponent.getQuantityCart(this.accountId);
      this.getCartBookList(this.accountId);
      this.getTotalMoney();
      this.headerComponent.getQuantityCart(this.accountId);
    });
  }

  showInfoCartDelete(cartBookDelete: ICartBook) {
    this.cartBookDelete = cartBookDelete;
  }

  delete(cartBookId: number) {
    this.cartService.deleteBookCart(cartBookId).subscribe(
      // this.cartService.deleteBookCart(cartBook.cartId.cartId).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.getCartBookList(this.accountId);
        this.getTotalMoney();
        this.notification.notify('success', 'Đã xóa sản phẩm');
        this.topFunction2();
        this.headerComponent.getQuantityCart(this.accountId);
      },
    );
  }

  deleteManyBookCart() {
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        // Kiểm tra số lượng sản phẩm đã chọn?
        this.quantityBookDelete.push(1);
        this.idManyCartBook[index] = check.cartId.cartId;
      }
    });
    this.cartService.deleteManyBookCart(this.idManyCartBook).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.getCartBookList(this.accountId);
        this.getTotalMoney();
        this.headerComponent.getQuantityCart(this.accountId);
      },
    );
    // Kiểm tra xem có sản phẩm để xóa không?
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        this.quantityBookDelete.push(1);
      }
    });
    if (this.quantityBookDelete.length < 1) {
      this.notification.notify('warning', 'Vui lòng chọn sản phẩm');
    } else {
      this.notification.notify('success', 'Đã xóa sản phẩm');
      this.topFunction2();
      this.quantityBookDelete.splice(0, this.quantityBookDelete.length);
      this.checkList.forEach((checked, index) => {
        this.checkList[index] = false;
      });
      this.checkAll = false;
    }
  }

  showPayPalButton() {
    this.cartBookList.forEach((check, index) => {
      if (this.checkList[index]) {
        // Kiểm tra số lượng sản phẩm đã chọn?
        this.quantityBookDelete.push(1);
        this.cartPaymentList.push(this.cartBookList[index].cartId);
      }
    });

    if (this.quantityBookDelete.length < 1) {
      this.notification.notify('warning', 'Vui lòng chọn sản phẩm');
    } else {

      // reset paypal
      (document.getElementById('paymentModal') as HTMLFormElement).click();
      (document.getElementById('myPayPal') as HTMLFormElement).innerHTML = '<div></div>';
      this.paymentPayPal = render(
        {
          id: '#myPayPal',
          currency: 'USD',
          value: (this.totalMoney / 25000).toFixed(2).toString(),
          onApprove: (details) => {
            this.notification.notify('success', 'Thanh toán thành công');
            this.payment();
          }
        }
      );


    }
  }

  payment() {
    this.cartService.paymentCart(this.cartPaymentList).subscribe(data => {
      }, () => {
      }, () => {
        this.headerComponent.getQuantityCart(this.accountId);
        // load page
        this.getCartBookList(this.accountId);
        this.getTotalMoney();
        this.topFunction2();
        // Xóa đi mấy cái đã tick trước đó
        this.cartPaymentList.splice(0, this.cartPaymentList.length);
        this.quantityBookDelete.splice(0, this.quantityBookDelete.length);
        this.checkList.forEach((checked, index) => {
          this.checkList[index] = false;
        });
        this.checkAll = false;
        window.location.assign('/cart');
      }
    );
  }

  deleteTick() {
    // reset số lượng quantity book
    this.quantityBookDelete.splice(0, this.quantityBookDelete.length);
  }
}

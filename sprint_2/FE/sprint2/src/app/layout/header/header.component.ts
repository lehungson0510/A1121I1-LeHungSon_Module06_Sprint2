import {Component, OnInit} from '@angular/core';
import {ICategory} from '../../model/book/ICategory';
import {CategoryService} from '../../service/book/category.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {Router} from '@angular/router';
import {CartService} from '../../service/cart/cart.service';
import {ICartBook} from '../../model/cart/ICartBook';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categoryList: ICategory[] = [];

  // login
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUser = false;
  showAccountantBoard = false;
  showSellBoard = false;
  userName: string;

  accountId: number;

  totalQuantityCart = 0;

  constructor(private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.accountId = this.tokenStorageService.getUser().account.accountId;
    this.getQuantityCart(this.accountId);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUser = this.roles.includes('ROLE_USER');
      this.showAccountantBoard = this.roles.includes('ROLE_ACCOUNTANT');
      this.showSellBoard = this.roles.includes('ROLE_SELL');

      console.log('roles: ' + this.roles);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.assign('');
    this.router.navigateByUrl('');
  }

  getAllCategory() {
    this.categoryService.findAllCategory().subscribe(
      (data) => {
        this.categoryList = data;
      }
    );
  }

  getNameSearch(value: string) {
    this.router.navigateByUrl('/search/' + value);
  }

  getQuantityCart(id: number) {
    this.cartService.getCartBookList(id).subscribe((data: ICartBook[]) => {
      this.totalQuantityCart = 0;
      data.forEach((cartBook) => {
        this.totalQuantityCart += cartBook.cartId.cartQuantity;
      });
    },
      () => {},
      () => {
        (document.getElementById('total-quantity-cart-id') as HTMLFormElement).innerText = this.totalQuantityCart.toString();
      });
  }
}

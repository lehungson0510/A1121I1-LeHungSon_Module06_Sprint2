import {Component, OnInit} from '@angular/core';
import {ICategory} from '../../model/book/ICategory';
import {CategoryService} from '../../service/book/category.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {Router} from '@angular/router';

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
  showAccountantBoard = false;
  showSellBoard = false;
  userName: string;

  constructor(private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
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
}

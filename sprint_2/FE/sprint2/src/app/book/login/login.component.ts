import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityServiceService} from '../../service/security/security.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {ShareService} from '../../service/security/share.service';
import {Router} from '@angular/router';
// import {HeaderComponent} from '../../layout/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
  roles: string[] = [];
  errorMessage = '';

  checkUserName = false;

  checkPassWord = false;
  isLoggedIn: boolean;
  urlImg: string;
  role: string;
  idEmployee: any;
  constructor(private formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private securityService: SecurityServiceService,
              private router: Router,
              private shareService: ShareService,
             ) {
  }

  ngOnInit(): void {
    this.loginTemplate();
    this.loadPage();
    this.top();
    // login
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: false
    });
    if (this.tokenStorageService.getUser()) {
      this.securityService.isLoggedIn = true;
      this.role = this.tokenStorageService.getUser().roles[0].roleName;
      this.username = this.tokenStorageService.getUser().account.username;
      this.router.navigate(['']);
    }
  }

  loginTemplate() {
    const switchCtn = document.querySelector('#switch-cnt');
    const switchC1 = document.querySelector('#switch-c1');
    const switchC2 = document.querySelector('#switch-c2');
    const switchCircle = document.querySelectorAll('.switch__circle');
    const switchBtn = document.querySelectorAll('.switch-btn');
    const aContainer = document.querySelector('#a-container');
    const bContainer = document.querySelector('#b-container');
    const allButtons = document.querySelectorAll('.submit');

    const getButtons = (e) => e.preventDefault();

    const changeForm = (e) => {
      switchCtn.classList.add('is-gx');
      setTimeout(function() {
        switchCtn.classList.remove('is-gx');
      }, 1500);

      switchCtn.classList.toggle('is-txr');
      switchCircle[0].classList.toggle('is-txr');
      switchCircle[1].classList.toggle('is-txr');

      switchC1.classList.toggle('is-hidden');
      switchC2.classList.toggle('is-hidden');
      aContainer.classList.toggle('is-txl');
      bContainer.classList.toggle('is-txl');
      bContainer.classList.toggle('is-z200');
    };

    const mainF = (e) => {
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', getButtons);
      }
      for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener('click', changeForm);
      }
    };

    window.addEventListener('load', mainF);
  }

  loadPage() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
  }

  top() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 420;
  }
  // login
  login() {
    console.log(this.loginForm.value.username);
    this.securityService.login(this.loginForm.value).subscribe(data => {
        console.log(data);
        if (this.loginForm.value.remember_me === true) {
          this.tokenStorageService.saveUserLocal(data);
          this.tokenStorageService.saveTokenLocal(data.jwtToken);
        } else if (this.loginForm.value.remember_me === false) {
          this.tokenStorageService.saveUserSession(data);
          this.tokenStorageService.saveTokenSession(data.jwtToken);
          // this.username = this.loginFrom.controls.username.value;
        }

        this.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().account.username;
        this.role = this.tokenStorageService.getUser().account.roles.roleName;
        console.log('username: ' + this.tokenStorageService.getUser().account.username);
        console.log('role: ' + this.tokenStorageService.getUser().account.roles[0].roleName);
        console.log('token: ' + this.tokenStorageService.getUser().jwtToken);
        console.log('token: ' + this.tokenStorageService.getUser().account.accountId);

        // this.loginForm.reset();
        // if (this.role.indexOf('ROLE_ADMIN') !== -1) {
        //     this.router.navigate(['/account/create']);
        //     this.shareService.sendClickEvent();
        //
        // } else {
        //     this.router.navigate(['/customer/list']);
        //     this.shareService.sendClickEvent();
        // }
      }
      , error => {
        if (this.loginForm.value.username === '') {
          // this.errorMessage1 = 'Tài khoản không được để trống';
          this.checkUserName = true;
        }
        if (this.loginForm.value.password === '') {
          // this.errorMessage1 = 'Tài khoản không được để trống';
          this.checkPassWord = true;
        }
        console.log(error);
        this.isLoggedIn = false;
        this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng';
      },
      () => {
        window.location.assign('');
        this.router.navigateByUrl('');
      });
  }
  private loadRememberInfo() {
    if (this.tokenStorageService.getUser()) {
      this.role = this.tokenStorageService.getUser().account.roles[0];
      console.log(this.role);
      this.username = this.tokenStorageService.getUser().account.username;
      console.log(this.username);
      this.urlImg = this.tokenStorageService.getUser().urlImg;
    } else {
      this.role = null;
      this.username = null;
      this.urlImg = null;
      this.idEmployee = null;
    }
    this.isLoggedIn = this.username != null;
  }
}

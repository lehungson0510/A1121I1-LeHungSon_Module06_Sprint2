import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.loginTemplate();
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


}

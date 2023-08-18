import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  determineLoginType(){
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return 'PhoneLoginState';
    }
    else {
      return 'WebLoginState';
    }

    /*navigator.userAgent.match("Firefox")　//判斷是否為 FireFox
    navigator.userAgent.match("MSIE")　//判斷是否為 IE
    navigator.userAgent.match("Opera")　//判斷是否為 Opera
    navigator.userAgent.match("Safari")　//判斷是否為 Safari 或 Google Chrome目前沒有方法*/
  }
}

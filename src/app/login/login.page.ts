import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../service/config.service';
import { LoginService } from '../service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {

  //loginType = 'pink';
  //selectedDevice = 'choosebackageground';
  login:any={message:'',type:'' };
  loginFrom!: FormGroup;
  constructor(public fb: FormBuilder,
              private configService: ConfigService,
              private router: Router,
              private loginType:LoginService) {
    this.myForm();
  }

  myForm() {
    this.loginFrom = this.fb.group({
     Email: [null, [Validators.required ]],
     Password: [null, [Validators.required,Validators.minLength(4)/*,this.passwordVal*/]],
    });
 }

 passwordVal(password:FormControl):object{
  let value = password.value;
  console.log(value);
  if(!value){
    return {mes:'請輸入密碼'}
  }
  return {}
}

/*選取變顏色不重要
onChange(deviceValue:any) {
  console.log(deviceValue);
  this.loginType = deviceValue;
  console.log(this.loginType);
}*/

  submit(){
    console.log("GET");
    console.log(this.loginType.determineLoginType());
    console.log(this.loginFrom.get('Email')?.value);

    if (!this.loginFrom.valid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    } else {
      this.configService.getConfig("post",
      environment.url+"/Login/Insert",new HttpParams()
        .set('Email', this.loginFrom.get('Email')?.value)
        .set('Password', this.loginFrom.get('Password')?.value)
        //.set('MachineType', this.loginType.determineLoginType()))
        .set('MachineType', 'PhoneLoginState'))
        .subscribe((data: Login) =>  {
          console.log(data);
          this.login = {'message':data.message,'type':data.type}
          sessionStorage.setItem("loginName", data.loginName);
          this.router.navigate(['/tabs']);
          //this.router.navigate(['/hero', hero.id]);
      });
      return console.log(this.loginFrom.value);
    }
  }
}

export interface Login {
  message: string;
  type: string;
  loginName: string;
}

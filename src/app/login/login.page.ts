import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../service/config.service';
import { LoginService } from '../service/login.service';
import { environment } from 'src/environments/environment';
//import { Share } from '@capacitor/share';
//import { Camera, CameraResultType } from '@capacitor/camera';

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

  async submit(){
    console.log("GET");
    console.log(this.loginType.determineLoginType());
    console.log(this.loginFrom.get('Email')?.value);

    if (!this.loginFrom.valid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    } else {

      /*await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        //url: 'http://ionicframework.com/',
        url: 'https://line.me/R/msg/text/?Hello%2C%20World%21',
        dialogTitle: 'Share with buddies',
      });*/

      /*const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
      var element = document.getElementById('imageElement') as HTMLImageElement;
      // Can be set to the src of an image now
      element.src = imageUrl != null?imageUrl:"";
      alert(imageUrl);
      return true;*/


      this.configService.getConfig("post",
      environment.url+"/Login/Insert",new HttpParams()
        .set('Email', this.loginFrom.get('Email')?.value)
        .set('Password', this.loginFrom.get('Password')?.value)
        .set('MachineType', this.loginType.determineLoginType()))
        //.set('MachineType', 'PhoneLoginState'))
        .subscribe(
          /*result => {
            // Handle result
            console.log(result)
          },
          error => {
            alert(111);
            alert(error);
            //this.errors = error;
          },
          () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
          }*/
          (data: Login) =>  {
          console.log(data);
          alert(data);
          this.login = {'message':data.message,'type':data.type}
          sessionStorage.setItem("loginName", data.loginName);
          this.router.navigate(['/tabs']);
          }
          //this.router.navigate(['/hero', hero.id]);
      );
      return console.log(this.loginFrom.value);
    }
  }
}

export interface Login {
  message: string;
  type: string;
  loginName: string;
}

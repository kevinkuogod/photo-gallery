import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService, Login } from '../service/config.service';
import { Observable } from 'rxjs';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  foodsTmp:FoodItem[]=[];
  foodsTmpstring:string="";
  foods:FoodItem[]=[];
  foodtype:string[] = ["豬肉","海鮮","牛肉","湯品","雞肉","甜品","主食"];
  foodTmpid:number=0;
  dietString:string="";
  byPassedHTMLString:string="";
  @ViewChild('myQuillEditor', { static: false }) quillEditorComponent: QuillEditorComponent | undefined;
  quillEditor: any;
  isModalOpenComments:boolean=false;

  constructor(private configService: ConfigService) {
    this.configService.getConfig("get",
    environment.url+"/Food/GetFood",
    new HttpParams())
      .subscribe((data: Login) =>  {
        console.log(data);
        //sqlserver
        //console.log(data.datas.result);
        //this.foodsTmp=data.datas.result;
        this.foodsTmp=data.data;
        for(let j=0;j<this.foodtype.length;j++){
          for(let i=0;i<this.foodsTmp.length;i++){
            if(this.foodtype[j] == this.foodsTmp[i].type){
              console.log(this.foodsTmp[i].type);
              this.foods.push(this.foodsTmp[i]);
            }
          }
        }
        console.log(this.foods);
      });

      var ItemsStringData = localStorage.getItem("ItemsStringData");
      if(ItemsStringData == null){
        localStorage.setItem("ItemsStringData", "[]");
      }else{
        var ItemsData = JSON.parse(ItemsStringData);
        for(let i=0;i<ItemsData.length;i++){
          if(ItemsData.foodTmpid>this.foodTmpid){
            this.foodTmpid=ItemsData.foodTmpid;
          }
        }
      }

      setInterval(() => {
        this.windowsResize(); // manually trigger change detection
      }, 1000);
  }

  //版型更換
  windowsType:number=0;
  windowsResize(){
    console.log('window.innerWidth:'+window.innerWidth);
    console.log(this.windowsType);
    if(window.innerWidth < 768){
      this.windowsType=1;
    }else{
      this.windowsType=0;
    }
  }

  userAddItem(id:number,name:string,price:string){
    /*var ItemsStringData = localStorage.getItem("ItemsStringData");
    var findItem = false;
    if(ItemsStringData != null){
      var ItemsData = JSON.parse(ItemsStringData);
      console.log(ItemsData.length);
      for(let i=0;i<ItemsData.length;i++){
        console.log("id"+ItemsData[i].id);
        if(ItemsData[i].id == id){
          var itemNumber = parseInt(ItemsData[i].number);
          ItemsData[i].number = (++itemNumber).toString();
          findItem = true;
        }
      }
      if(!findItem){
        ItemsData.push({"id":id,"name":name,"number":1,"price":price});
      }
      localStorage.setItem("ItemsStringData", JSON.stringify(ItemsData));
      }*/

      var ItemsStringData = localStorage.getItem("ItemsStringData");
      if(ItemsStringData != null){
        var ItemsData = JSON.parse(ItemsStringData);
        ItemsData.push({"foodTmpid":this.foodTmpid,"id":id,"name":name,"number":1,"price":price,remark:"",modelOpen:false});
        localStorage.setItem("ItemsStringData", JSON.stringify(ItemsData));
        this.foodTmpid++;
      }
  }

  userCutItem(id:number,name:string,foodTmpid:number){
    var ItemsStringData = localStorage.getItem("ItemsStringData");
    var findItem = false;
    if(ItemsStringData != null){
      var ItemsData = JSON.parse(ItemsStringData);
      console.log(ItemsData.length);
      for(let i=0;i<ItemsData.length;i++){
        console.log("id"+ItemsData[i].id);
        if(ItemsData[i].foodTmpid == foodTmpid){
          var itemNumber = parseInt(ItemsData[i].number);
          ItemsData[i].number = (--itemNumber).toString();
          if(itemNumber > 0){
            findItem = true;
          }else if(itemNumber == 0){
            ItemsData.splice(i, 1);
            findItem = true;
          }
        }
      }
      if(findItem){
        localStorage.setItem("ItemsStringData", JSON.stringify(ItemsData));
        this.setOpen(true);
      }
    }
  }

  checkType(currentType:string){
    if(currentType != this.foodsTmpstring){
      this.foodsTmpstring = currentType;
      return true;
    }else{
      return false; 
    }
  }

  public alertButtons = ['OK'];
  
  quillSubmit(){
    console.log("vvvvvvvvvv");
    if(this.quillEditorComponent!= undefined){
      this.quillEditor = this.quillEditorComponent.quillEditor;
      const textContent = this.quillEditor.getText();
      console.log(textContent);
    }
  }

  setOpenComments(isOpen:boolean){
    this.isModalOpenComments = isOpen;
  }
  
  isModalOpen = false;
  buyItem:buyFoodItem[]=[];
  //點餐內容
  setOpen(isOpen: boolean) {
    this.buyItem=[];
    if(isOpen){
      var ItemsStringData = localStorage.getItem("ItemsStringData");
      if(ItemsStringData != null){
        var ItemsData = JSON.parse(ItemsStringData);
        for(let i=0;i<ItemsData.length;i++){
          this.buyItem.push(ItemsData[i]);
        }
      }
    }
    this.isModalOpen = isOpen;
  }

  isModalOpenDiet = false;
  remarkTmp = '';
  foodTmpidDiet=-1;
  //點餐內容
  //setOpenDiet(isOpen: boolean,foodTmpid:number) {
  setOpenDiet(isOpen: boolean,remark: string="",foodTmpid:number) {
    var ItemsStringData = localStorage.getItem("ItemsStringData");
    if(ItemsStringData != null){
      var ItemsData = JSON.parse(ItemsStringData);
      console.log(ItemsData.length);
      for(let i=0;i<ItemsData.length;i++){
        if(ItemsData[i].foodTmpid == foodTmpid){
          this.remarkTmp = ItemsData[i].remark;
          this.foodTmpidDiet=foodTmpid;
        }
      }
    }
    console.log(isOpen);
    this.isModalOpenDiet = isOpen;
  }

  setCloseDiet(isOpen: boolean) {
    this.isModalOpenDiet = isOpen;
    var ItemsStringData = localStorage.getItem("ItemsStringData");
    if(ItemsStringData != null){
      var ItemsData = JSON.parse(ItemsStringData);
      for(let i=0;i<ItemsData.length;i++){
        if(ItemsData[i].foodTmpid == this.foodTmpidDiet){
          if(this.remarkTmp==''){
            ItemsData[i].remark=this.dietString;
            console.log('我有近來');
          }else{
            if((this.dietString!='') && (ItemsData[i].remark !='')){
              ItemsData[i].remark=ItemsData[i].remark+this.dietString;
            }
            console.log('我有近來2');
          }
        }
      }
      localStorage.setItem("ItemsStringData", JSON.stringify(ItemsData));
    }
    this.setDiet('');
    this.remarkTmp='';
    this.foodTmpidDiet=-1;
  }

  setDiet(diet:string){
    if(diet==''){
      this.dietString=diet;
    }else{
      if((this.dietString == "") && (this.remarkTmp=="")){
        this.dietString=diet;
      }else{
        this.dietString=this.dietString+','+diet;
        console.log('我有近來3');
      }
    }
  }

  sendFoodItem(){
    var ItemsStringData = localStorage.getItem("ItemsStringData");
    console.log("{\"buyJson\":"+ItemsStringData+"}");
    this.configService.getConfig("post",
      environment.url+"/Food/BuyFood",new HttpParams(),ItemsStringData!=null?/*"{\"buyJson\":"+ItemsStringData+"}"*/ItemsStringData:"")
        //.set('MachineType', 'PhoneLoginState'))
        .subscribe((data: Login) =>  {
          console.log(data);
          /*this.login = {'message':data.message,'type':data.type}
          sessionStorage.setItem("loginName", data.loginName);
          this.router.navigate(['/tabs']);*/
          //this.router.navigate(['/hero', hero.id]);
    });
  }

  testFoodItem(){
    for(let times=0;times<1000;times++){
      var ItemsData=[];//最後要送出去的資料
      var ItemsOrder:any=[];//以經點過的菜排除
      var testNumber=this.getRandomInt(1000);//每筆資料最少有1道到1000道，有重複道數
      var numberFood=0;//每道的數量
      while(testNumber>=0){
        var testFoodNumber=this.getRandomInt(14);//隨機抽出14道菜色
        console.log("跑完了1");
        console.log(testFoodNumber);
        console.log(ItemsData.length);
        if(ItemsOrder.indexOf(testFoodNumber) == -1){
          console.log("跑完了20");
          ItemsOrder.push(testFoodNumber);
          console.log(testNumber);
          numberFood=this.getRandomInt(30);//隨機抓取某樣的道數
          console.log(numberFood);
          ItemsData.push({"id":testFoodNumber,"name":this.foods[testFoodNumber-1].name,"number":numberFood,"price":this.foods[testFoodNumber-1].price});
          testNumber-=numberFood;
          if(ItemsOrder.length == 14){
            console.log("提前出來");
            break;
          }
        }
        /*else if(ItemsOrder.length == 13){
          console.log("跑完了30");
          for(let i=0;i<this.foods.length;i++){
            var tmpFoodNumber=i;
            if(ItemsOrder.indexOf(i) == -1){
              ItemsData.push({"id":testFoodNumber,"name":this.foods[tmpFoodNumber].name,"number":testNumber,"price":this.foods[tmpFoodNumber].price});
              testNumber=0;
            }
          }
        }*/
      }
      console.log("跑完了");
      console.log(ItemsData);

      this.configService.getConfig("post",
        environment.url+"/Food/BuyFood",new HttpParams(), JSON.stringify(ItemsData))
          .subscribe((data: Login) =>  {
            console.log(data);
      });
    }
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max)+1;
  }

}

interface FoodItem {
  id: number;
  imgSrc: string;
  type: string;
  name: string;
  content: string;
  quantity:number;
  price:string;
  number:number;
}

interface buyFoodItem {
  id: number;
  imgSrc: string;
  name: string;
  number:number;
  foodTmpid:number;
  remark:string;
}

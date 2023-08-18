import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService, Login } from '../service/config.service';

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
  constructor(private configService: ConfigService) {
    this.configService.getConfig("get",
    environment.url+"/Food/GetFood",
    new HttpParams())
      .subscribe((data: Login) =>  {
        console.log(data);
        //sqlserver
        //console.log(data.datas.result);
        //this.foodsTmp=data.datas.result;
        this.foodsTmp=data.datas;
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
      }
  }

  userAddItem(id:number,name:string){
    var ItemsStringData = localStorage.getItem("ItemsStringData");
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
        ItemsData.push({"id":id,"name":name,"number":1});
      }
      localStorage.setItem("ItemsStringData", JSON.stringify(ItemsData));
      }
  }

  userCutItem(id:number,name:string){
    var ItemsStringData = localStorage.getItem("ItemsStringData");
    var findItem = false;
    if(ItemsStringData != null){
      var ItemsData = JSON.parse(ItemsStringData);
      console.log(ItemsData.length);
      for(let i=0;i<ItemsData.length;i++){
        console.log("id"+ItemsData[i].id);
        if(ItemsData[i].id == id){
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
  
  
  isModalOpen = false;
  buyItem:buyFoodItem[]=[];
  setOpen(isOpen: boolean) {
    if(isOpen){
      var ItemsStringData = localStorage.getItem("ItemsStringData");
      if(ItemsStringData != null){
        var ItemsData = JSON.parse(ItemsStringData);
        for(let i=0;i<ItemsData.length;i++){
          this.buyItem.push(ItemsData[i]);
        }
      }
    }else{
      this.buyItem=[];
    }
    this.isModalOpen = isOpen;
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
}

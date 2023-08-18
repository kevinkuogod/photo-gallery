import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivilageService {
  //期望權限
  desiredPrivilage:Privilage = Privilage.Read | Privilage.Creat;
  //客戶權限
  privadePrivilage:Privilage = Privilage.Read | Privilage.Delete;
  constructor() { }

  permit(desiredPrivilage:Privilage, privadePrivilage:Privilage){
    //參數不合法
    if(!desiredPrivilage || !privadePrivilage){
      return false;
    }
    //提供權限未涵蓋期望的權限
    if(desiredPrivilage !== (desiredPrivilage & privadePrivilage)){
      return false;
    }
    //提供的權限涵蓋了期望的權限
    return true;
  }
}
enum Privilage{
  None = 0, //沒有任何權限
  Read = 1 << 0, //1,0b0001,讀的權限
  Write = 1 << 1,//2,0b0010,寫的權限
  Creat = 1 << 2,//4,0b0100,新建的權限
  Delete = 1 << 3,//8,0b1000,刪除的權限
  All = ~(~0 << 4)//15,0b1111,所有的權限
}
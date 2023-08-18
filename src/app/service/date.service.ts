import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  //參數一定要擺在constructor上面
  dt:Date = new Date();
  getMonth:string='';
  constructor() { }

  getDate () { 
    if(this.dt.getMonth() < 9){
      this.getMonth = '0'+(this.dt.getMonth()+1);
    }else{
      this.getMonth = (this.dt.getMonth()+1).toString();
    } 
    return this.dt.getFullYear()+'-'+this.getMonth+'-'+this.dt.getDate()+' '+this.dt.getHours()+':'+this.dt.getMinutes()+':'+this.dt.getSeconds()+':'+this.dt.getMilliseconds();
    //'2023-03-01 12:36:12:000'
  }

  mGetDate(FullYear:number, Month:number):number{
    //取得一個月有幾天
    let date  = new Date();
    let year  = FullYear;
    let month = Month+1;
    let d = new Date(year, month, 0);
    return d.getDate();
  }

  getCalender(FullYear:number, Month:number):number[]{
    //取得本月天數
    let totalMonthDate = this.mGetDate(FullYear, Month);
    
    //取得上個月天數
    let totalMonthDateLast:number;
    if(Month==0){
      totalMonthDateLast = this.mGetDate(FullYear-1, 11);
    }else{
      totalMonthDateLast = this.mGetDate(FullYear-1, Month-1);
    }

    //取得某月的第一天星期幾
    let weekday = this.getMonthWeek(FullYear,Month,1);

    //宣告一個陣列一頁的日期
    let totalDate:number[] = [];
    for(let repairLast=(weekday-1);repairLast>=0;repairLast--){
      totalDate.push(totalMonthDateLast-repairLast);
    }
    for(let currentMonthDate=1;currentMonthDate<=totalMonthDate;currentMonthDate++){
      totalDate.push(currentMonthDate);
    }

    //取得某月的最後一天星期幾
    weekday = this.getMonthWeek(FullYear,Month,totalMonthDate);
    for(let nextMonthDate=1;nextMonthDate<=Math.abs(6-weekday);nextMonthDate++){
      totalDate.push(nextMonthDate);
    }
    return totalDate;
  }

  getMonthWeek(FullYear:number, Month:number, day:number){
    return new Date(FullYear, Month, day).getDay();
  }
}

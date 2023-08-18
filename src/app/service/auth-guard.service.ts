import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad{
  //目前試不出來router守衛只能一個一個判定
  constructor() { }
  //canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  canLoad(): boolean | Observable<boolean> {
    return false;
    
    /*if(sessionStorage.getItem("loginName") != null){
      return true;
    }else{
      return false;
    }*/
    throw new Error('Method not implemented.');
  }
}

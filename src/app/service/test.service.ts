import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
}

export class People {
  name:string = "";
  age:number = 0;
  constructor() { }

  greet():void{
    console.log(`Hi,I'm${this.name}.And my age is ${this.age}`);
  }
}
let json ='{"name":"Lcng","age":"i"}';
export let people = JSON.parse(json) as People;
//people.greet();
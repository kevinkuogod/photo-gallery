import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  json:any = {};
  constructor(private http: HttpClient) { 
  }

  //term :string 要換object跑回圈
   getConfig(requestType:string,configUrl:string,term: HttpParams) {
    // Add safe, URL encoded search parameter if there is a search term
    //term = term.trim();
    //const options = term ?{ params: new HttpParams().set('Email', 'kevin123@gmail.com').set('Password', '123456') } : {};
    //const options = {};
    const httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type': 'application/json; charset=utf-8'
         
      })  
    };  
    
    const headers = new HttpHeaders({
      //'Content-Type': 'application/json'
      'Cache-Control':'no-cache',
      'Postman-Token':'<calculated when request is sent>',
      'Content-Type':'multipart/form-data; boundary=<calculated when request is sent>',
      'Host':'<calculated when request is sent>',
      //'credentials': 'include',
      //'withCredentials': 'true'
      //'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Credentials': 'true',
      //'Access-Control-Allow-Headers': 'Content-Type',
      //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });

    const body = {
      'Email': 'kevin123@gmail.com',
      'Password': '123456'
    };
    this.json['loginJson'] = JSON.stringify(body);
    //const params = new HttpParams().set('optionalParam', 'optionalValue');

    /*var paramsd:HttpParams = new HttpParams() 不給這樣用，會設定不到
    //const formData = new FormData();
    Object.keys(term).forEach((k,i)=>{  
        var d =Object.values(term)[i];
        //formData.append(k,d)
        //formData.append('file', file);
        paramsd.set(k.toString(),d.toString());
    })*/
    //console.log(paramsd);

    /*let responseObservable:Observable<object> = this.http.get<Login>(configUrl, { headers: headers, params: term }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )*/

    if(requestType == "get"){
      return this.http.get<Login>(configUrl, { headers: headers, params: term }).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      ) 
    }else if(requestType == "post"){
      return this.http.post<Login>(configUrl, body, { headers: headers, params: term }).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
    }else{
      return this.http.get<Login>(configUrl, { headers: headers, params: term }).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      //return {message: "error", type: "error"} as Login;
    }
    /*待研究
    .toPromise()  
    .then(  
      res => console.log(res.json()),  
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`) ①  
    );  
    */
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alert(error.error.message);
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

//可多放一層tool層在調用
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

export interface Login {
  message: string;
  type: string;
  loginName: string;
  datas: {result:[]};
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string="http://unosysit.in/prop007/Api";


constructor(private http:HttpClient) { }

login(userInfo: any): Observable<any> {
  return this.http.post(this.baseUrl + '/login',userInfo);
}
}

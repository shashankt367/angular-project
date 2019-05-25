import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl:string="http://unosysit.in/prop007/Api";

constructor(private http:HttpClient) { }

signUp(registerInfo: any): Observable<any> {
  return this.http.post(this.baseUrl + '/signUp',registerInfo);
}
}

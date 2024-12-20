import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string ="https://localhost:7125/api/User/";
  private userPayload:any;

  constructor(private http: HttpClient,private router:Router) {
    this.userPayload=this.decodedToken();
   }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)

  }
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)

  }

  signOut(){
    localStorage.clear();
   this.router.navigate(['login']);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
isLoggedIn(){
  return !!localStorage.getItem('token')
}

  decodedToken(){
    const jwtHelper=new JwtHelperService();
    const token=this.getToken()!;
    return jwtHelper.decodeToken(token)
  }
  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }
  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}

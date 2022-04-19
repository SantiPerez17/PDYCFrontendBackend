import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<any>(environment.API_URL+'login',{email,password},{observe: 'response'})
    .pipe(map(res =>{
      if (res.headers.get("Authorization")){
        localStorage.setItem('apiKey', res.headers.get("Authorization"));
      }
      console.log(res);
      return res;
    }));
  }
  logout(){
    localStorage.removeItem('apiKey');    
  }
}

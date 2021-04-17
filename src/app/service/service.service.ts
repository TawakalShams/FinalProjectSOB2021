import { Injectable,EventEmitter ,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users } from '../users';
import { baseUrl } from 'src/environments/environment';
import { ApiResponse } from 'src/api-response';
import { ImsModule } from '../module/ims/ims.module';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  private baseUrl:string = "http://localhost/ims/api";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  handleError: any;
  constructor(private httpClient : HttpClient) {}
 
  redirectUrl: any;
  private _refreshNeeded$ = new Subject<void>();
  
  get refreshNeeded$(){
      return this._refreshNeeded$
  }

  login(data: any) {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', data)
    .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
      const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
  return false;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
 
getToken() {
  return localStorage.getItem('token');
}

 createAgent(user: Users){
   return this.httpClient.post(this.baseUrl + '/registerAgent.php', Users)
  }

viewAgent(){
  return this.httpClient.get<[ImsModule]>(this.baseUrl + '/viewAgents.php')
}

getSingleAgent(){
  
}
 
deleteToken() {
  localStorage.removeItem('token');
}
 

}


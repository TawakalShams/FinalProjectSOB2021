import { Injectable,EventEmitter ,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Users } from '../users';
import { ImsModule } from '../module/ims/ims.module';
import { baseUrl } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  handleError: any;
  constructor(private httpClient : HttpClient) {}
 
  redirectUrl: any;
  private _refreshNeeded$ = new Subject<void>();
  
  get refreshNeeded$(){
      return this._refreshNeeded$
  }


 login(data:any):Observable<any>{
  return this.httpClient.post<any>(`${baseUrl}login.php`, data)
}
 
getToken() {
  return localStorage.getItem('token');
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


 createAgent(user: Users){
   return this.httpClient.post(baseUrl + '/registerAgent.php', Users)
  }
url = "http://localhost:8080"
viewAgent(){
return this.httpClient.get<[ImsModule]>(baseUrl + '/viewAgents.php')
//  return this.httpClient.get<[ImsModule]>(this.url + '/users')
  
}

getSingleAgent(){
  
}
 
deleteToken() {
  localStorage.removeItem('token');
}
 

}


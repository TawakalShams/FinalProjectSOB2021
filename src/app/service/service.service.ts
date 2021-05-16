import { Injectable,EventEmitter ,Output } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject,throwError } from 'rxjs';
import { ImsModule } from '../module/ims/ims.module';
import { baseUrl } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
 
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  [x: string]: any;
  agentid: any;
  loader = false;
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  handleError: any;


  constructor(private httpClient : HttpClient,
              public jwtHelper: JwtHelperService
    ) {}
 
//   ngOnInit(): void {
// this.refreshAgents.subscribe(l =>console.log(l))

//   }

  redirectUrl: any;
  private _refreshNeeded$ = new Subject<void>();
  
  get refreshNeeded$(){
      return this._refreshNeeded$
  }
  // public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

 login(data:any):Observable<any>{
  return this.httpClient.post<any>(baseUrl + '/login', data)
}
  setToken(token: string) {
    localStorage.setItem('token', token);
    
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

 

errorHandler(error: any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

// =========================AGENT CRUD=====================================
createAgent(data: any): Observable<any> {
  return this.httpClient.post(baseUrl + '/agents', data);

}
viewAgent(){
   return this.httpClient.get(baseUrl + '/agents') ;

}


getSingleAgent(agentid: any){
  return this.httpClient.get(baseUrl + '/agents'+'/'+agentid);

}
updateAgent(){

}
deleteAgent(agentid: any){
  return this.httpClient.delete(baseUrl + '/agents'+'/'+agentid);

}

// =============================Customers CRUD======================================
viewCustomers(){
return this.httpClient.get<[ImsModule]>(baseUrl + '/viewCustomers.php')
  //  return this.httpClient.get<[ImsModule]>(this.url + '/users')
    
  }


  // =============================Vehicles CRUD======================================

  // =============================Insuarance CRUD======================================

  // =============================Commission CRUD======================================

  // =============================Acident CRUD======================================

  
  // =============================Customers CRUD======================================

  // ===========================================================

deleteToken() {
  localStorage.removeItem('token');
}
// =====================Gurd==========================
    public isAuthenticated(): boolean {
    const token: string | null = this.getToken();
    return !this.jwtHelper.isTokenExpired(token as string);
  }

}


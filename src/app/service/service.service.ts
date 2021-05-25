import { Injectable,EventEmitter ,Output } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { ImsModule } from '../module/ims/ims.module';
import { baseUrl } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  [x: string]: any;
  agentid: any;
  loader = false;
  redirectUrl: any;
  handleError: any;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient,
              public jwtHelper: JwtHelperService,
    ) {}

      httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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
updateAgent(agentid: any, data: any){
  return this.httpClient.put(baseUrl + '/agents'+'/'+agentid, data);
}
deleteAgent(agentid: any){
  return this.httpClient.delete(baseUrl + '/agents'+'/'+agentid);
}
  // =============================Vehicles CRUD======================================

  createVehicle(data: any): Observable<any> {
  return this.httpClient.post(baseUrl + '/vehicles', data);
}
viewVehicles(){
   return this.httpClient.get(baseUrl + '/vehicles') ;
}

getSingleVehicle(platenumber: any){
  return this.httpClient.get(baseUrl + '/vehicles'+'/'+platenumber);
}
updateVehicle(platenumber: any, data: any){
  return this.httpClient.put(baseUrl + '/vehicles'+'/'+platenumber, data);
}
deletVehicle(platenumber: any){
  return this.httpClient.delete(baseUrl + '/vehicles'+'/'+platenumber);
}

  // =============================Insuarance CRUD======================================

  // =============================Commission CRUD======================================

  // =============================Acident CRUD======================================
// ================================Payment CRUD=========================================
createPayment(data: any): Observable<any> {
  return this.httpClient.post(baseUrl + '/payment', data);
}
viewPayment(){
   return this.httpClient.get(baseUrl + '/payment') ;

}

getSinglePayment(paymentId : any){
  return this.httpClient.get(baseUrl + '/payment'+'/'+paymentId);
}
updatePayment(paymentId: any, data: any){
  return this.httpClient.put(baseUrl + '/payment'+'/'+paymentId, data);
}
deletePayment(paymentId: any){
  return this.httpClient.delete(baseUrl + '/payment'+'/'+paymentId);
}

  // =============================Customers CRUD======================================
createCustomer(data: any): Observable<any> {
  return this.httpClient.post(baseUrl + '/customers', data);
}
viewCustomers(){
   return this.httpClient.get(baseUrl + '/customers') ;

}

getSingleCustomer(customerid: any){
  return this.httpClient.get(baseUrl + '/customers'+'/'+customerid);
}
updateCustomer(customerid: any, data: any){
  return this.httpClient.put(baseUrl + '/customers'+'/'+customerid, data);
}
deleteCustomer(customerid: any){
  return this.httpClient.delete(baseUrl + '/customers'+'/'+customerid);
}
  // ===========================Login and logout================================
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

logout() {
  localStorage.removeItem('token');
}
// =====================Gurd==========================
    public isAuthenticated(): boolean {
    const token: string | null = this.getToken();
    return !this.jwtHelper.isTokenExpired(token as string);
  }
}

function tap(arg0: () => void): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}


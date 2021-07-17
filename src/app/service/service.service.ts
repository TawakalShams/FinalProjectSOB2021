import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ImsModule } from '../module/ims/ims.module';
import { baseUrl } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Refresh } from '@ngrx/store-devtools/src/actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  [x: string]: any;
  agentid: any;
  loader = false;
  redirectUrl: any;
  handleError: any;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public router: Router //  public toggler: TogglerService,
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // =========================Admin CRUD=====================================
  createAdmin(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/register', data);
  }

  ViewUsers() {
    return this.httpClient.get(baseUrl + '/users');
  }

  // =========================CHANGE PASSWORD=====================================
  // changePassword(id: any, data:any): Observable<any> {
  //   return this.httpClient.post(baseUrl + '/changePassword' + '/' + id, data);
  // }
  changePassword(id: any, data: any) {
    return this.httpClient.put(baseUrl + '/changePassword' + '/' + id, data);
  }
  // =========================AGENT CRUD=====================================
  createAgent(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/agents', data);
  }
  viewAgent() {
    return this.httpClient.get(baseUrl + '/agents');
  }

  getSingleAgent(agentid: any) {
    return this.httpClient.get(baseUrl + '/agents' + '/' + agentid);
  }
  updateAgent(agentid: any, data: any) {
    return this.httpClient.put(baseUrl + '/agents' + '/' + agentid, data);
  }
  deleteAgent(agentid: any) {
    return this.httpClient.delete(baseUrl + '/agents' + '/' + agentid);
  }
  // =============================Vehicles CRUD======================================

  vehiclesPayed() {
    return this.httpClient.get(baseUrl + '/vehiclesPayed');
  }

  createVehicle(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/vehicles', data);
  }
  viewVehicles(): Observable<any> {
    return this.httpClient.get(baseUrl + '/vehicles');
  }

  getSingleVehicle(platenumber: any) {
    return this.httpClient.get(baseUrl + '/vehicles' + '/' + platenumber);
  }
  updateVehicle(platenumber: any, data: any) {
    return this.httpClient.put(baseUrl + '/vehicles' + '/' + platenumber, data);
  }
  deletVehicle(platenumber: any) {
    return this.httpClient.delete(baseUrl + '/vehicles' + '/' + platenumber);
  }

  // =============================Loop CRUD===========================================
  loop() {
    return this.httpClient.get(baseUrl + '/loop');
  }
  // =============================Insuarance CRUD======================================
  createInsuarance(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/insuarance', data);
  }
  viewInsuarance() {
    return this.httpClient.get(baseUrl + '/insuarance');
  }

  getSingleInsuarance(insuaranceid: any) {
    return this.httpClient.get(baseUrl + '/insuarance' + '/' + insuaranceid);
  }
  updateInsuarance(insuaranceid: any, data: any) {
    return this.httpClient.put(
      baseUrl + '/insuarance' + '/' + insuaranceid,
      data
    );
  }
  deleteInsuarance(insuaranceid: any) {
    return this.httpClient.delete(baseUrl + '/insuarance' + '/' + insuaranceid);
  }

  // =============================IMAGE======================================
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  // =============================Acident CRUD======================================
  createAcident(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/accident', data);
  }
  viewAcident() {
    return this.httpClient.get(baseUrl + '/accident');
  }

  getSingleAcident(acidentid: any) {
    return this.httpClient.get(baseUrl + '/accident' + '/' + acidentid);
  }
  updateAcident(acidentid: any, data: any) {
    return this.httpClient.put(baseUrl + '/accident' + '/' + acidentid, data);
  }
  deleteAcident(acidentid: any) {
    return this.httpClient.delete(baseUrl + '/accident' + '/' + acidentid);
  }
  // =============================PayInsuared CRUD======================================
  createPayInsuard(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/payinsuared', data);
  }
  viewPayInsuard() {
    return this.httpClient.get(baseUrl + '/payinsuared');
  }

  getSinglePayInsuard(payid: any) {
    return this.httpClient.get(baseUrl + '/payinsuared' + '/' + payid);
  }
  updatePayInsuard(payid: any, data: any) {
    return this.httpClient.put(baseUrl + '/payinsuared' + '/' + payid, data);
  }
  deletePayInsuard(payid: any) {
    return this.httpClient.delete(baseUrl + '/payinsuared' + '/' + payid);
  }
  // ================================Report CRUD=========================================

  getSingleCustomerReport(vehicleid: any) {
    return this.httpClient.get(baseUrl + '/customerReport' + '/' + vehicleid);
  }

  // ================================Payment CRUD=========================================
  createPayment(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/payment', data);
  }
  viewPayment() {
    return this.httpClient.get(baseUrl + '/payment');
  }

  getSinglePayment(paymentId: any) {
    return this.httpClient.get(baseUrl + '/payment' + '/' + paymentId);
  }
  updatePayment(paymentId: any, data: any) {
    return this.httpClient.put(baseUrl + '/payment' + '/' + paymentId, data);
  }
  deletePayment(paymentid: any) {
    return this.httpClient.delete(baseUrl + '/payment' + '/' + paymentid);
  }

  // =============================Customers CRUD======================================
  createCustomer(data: any): Observable<any> {
    return this.httpClient.post(baseUrl + '/customers', data);
  }
  viewCustomers() {
    return this.httpClient.get(baseUrl + '/customers');
  }

  getSingleCustomer(customerid: any) {
    return this.httpClient.get(baseUrl + '/customers' + '/' + customerid);
  }
  updateCustomer(customerid: any, data: any) {
    return this.httpClient.put(baseUrl + '/customers' + '/' + customerid, data);
  }
  deleteCustomer(customerid: any) {
    return this.httpClient.delete(baseUrl + '/customers' + '/' + customerid);
  }
  // ===========================Login and logout================================
  login(data: any): Observable<any> {
    return this.httpClient.post<any>(baseUrl + '/login', data);
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
      return true;
    }
    return false;
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('token');
  }
  toggle(): void {
    this.toggled ? (this.toggled = false) : (this.toggled = true);
  }
  refesh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['vehicle']);
    });
  }
  // refresh(): any {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([this.location.path()]);
  //   });
  //   // this.loadingSimple();
  // }
  // =====================Gurd==========================
  public isAuthenticated(): boolean {
    const token: string | null = this.getToken();
    return !this.jwtHelper.isTokenExpired(token as string);
  }
}

function tap(arg0: () => void): import('rxjs').OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}

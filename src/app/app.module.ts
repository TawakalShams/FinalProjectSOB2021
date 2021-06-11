import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HeadnavComponent } from './framework/layouts/headnav/headnav.component';
import { ToastrModule } from 'ngx-toastr';
import { AgentregstrationComponent } from './pages/agent/agentregstration/agentregstration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/shared/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcidentComponent } from './pages/shared/acident/acident.component';
import { CustomerComponent } from './pages/shared/customer/customer.component';
import { ViewAgentComponent } from './pages/agent/view-agent/view-agent.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { ViewcustomerComponent } from './pages/shared/customer/viewcustomer/viewcustomer.component';
import { AgentComponent } from './dialog/agent/agent.component';
import { ViewAdminComponent } from './pages/admin/view-admin/view-admin.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { ViewCommsionComponent } from './pages/commission/view-commsion/view-commsion.component';
import { ServiceService } from './service/service.service';
import { ConfirmDeleteAgentComponent } from './dialog/confirm-delete-agent/confirm-delete-agent.component';
import { VehiclesComponent } from './pages/shared/vehicles/vehicles/vehicles.component';
import { ViewVehiclesComponent } from './pages/shared/vehicles/view-vehicles/view-vehicles.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ReactiveComponentModule } from '@ngrx/component';
import { ConfirmDeleteCustomerComponent } from './dialog/confirm-delete-customer/confirm-delete-customer.component';
import { CustomerPaymentComponent } from './dialog/customer-payment/customer-payment.component';
import { UpdateCustomerComponent } from './dialog/update-customer/update-customer.component';
import { ConfirmDeleteVehicleComponent } from './dialog/confirm-delete-vehicle/confirm-delete-vehicle.component';
import { UpdateVehicleComponent } from './dialog/update-vehicle/update-vehicle.component';
import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
import { CustomerPaymentsComponent } from './pages/shared/customer/customer-payments/customer-payments.component';
import { ViewInsuaranceComponent } from './pages/shared/insuarance/view-insuarance/view-insuarance.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UpdateCustomerPaymentComponent } from './dialog/update-customer-payment/update-customer-payment.component';
import { ConfirmDeletePaymentComponent } from './dialog/confirm-delete-payment/confirm-delete-payment.component';
import { UpdateInsuranceComponent } from './dialog/update-insurance/update-insurance.component';
import { ConfirmInsuaranceComponent } from './dialog/confirm-insuarance/confirm-insuarance.component';
import { DashboardComponent } from './framework/dashboard/dashboard.component';
import { ReportTableComponent } from './framework/AccountStatement/report-table/report-table.component';
import { InsuranceReportComponent } from './reports/insurance-report/insurance-report.component';
import { NgxPrintModule } from 'ngx-print';
import { ClockComponent } from './clock/clock.component';
import { ViewAcidentComponent } from './pages/shared/acident/view-acident/view-acident.component';
import { UpdateAcidentComponent } from './dialog/update-acident/update-acident.component';
import { ConfirmDeleteAcidentComponent } from './dialog/confirm-delete-acident/confirm-delete-acident.component';
import { ConfirmPaymentInsuaredComponent } from './dialog/confirm-payment-insuared/confirm-payment-insuared.component';
import { ViewPaymentPayedComponent } from './pages/shared/acident/view-payment-payed/view-payment-payed.component';

export const tokenGetter = () => {
  return localStorage.getItem('token');
};

@NgModule({
  declarations: [
    AppComponent,
    HeadnavComponent,
    AgentregstrationComponent,
    LoginComponent,
    AcidentComponent,
    CustomerComponent,
    ViewAgentComponent,
    CommissionComponent,
    ViewcustomerComponent,
    AgentComponent,
    ViewAdminComponent,
    AdminloginComponent,
    ViewCommsionComponent,
    ConfirmDeleteAgentComponent,
    VehiclesComponent,
    ViewVehiclesComponent,
    ConfirmDeleteCustomerComponent,
    CustomerPaymentComponent,
    UpdateCustomerComponent,
    ConfirmDeleteVehicleComponent,
    UpdateVehicleComponent,
    InsuaranceComponent,
    CustomerPaymentsComponent,
    ViewInsuaranceComponent,
    UpdateCustomerPaymentComponent,
    ConfirmDeletePaymentComponent,
    UpdateInsuranceComponent,
    ConfirmInsuaranceComponent,
    DashboardComponent,
    ReportTableComponent,
    InsuranceReportComponent,
    ClockComponent,
    ViewAcidentComponent,
    UpdateAcidentComponent,
    ConfirmDeleteAcidentComponent,
    ConfirmPaymentInsuaredComponent,
    ViewPaymentPayedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveComponentModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    NgxPrintModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      // StoreModule.forRoot(reducers, { metaReducers })
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

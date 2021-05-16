import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { DashboardComponent } from './framework/dashboard/dashboard.component';
import { HeadnavComponent } from './framework/layouts/headnav/headnav.component';
import { ToastrModule } from 'ngx-toastr';
// import { PaymentComponent } from './pages/shared/payment/payment.component';
import { AgentregstrationComponent } from './pages/agent/agentregstration/agentregstration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/shared/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcidentComponent } from './pages/shared/acident/acident.component';
// import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
// import { InsuaredComponent } from './pages/shared/insuared/insuared.component';
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
// import { DefaultComponent } from './framework/layouts/default/default.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

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
   
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDatatableModule ,
    FormsModule,
    
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

        JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
  ],
  providers: [
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

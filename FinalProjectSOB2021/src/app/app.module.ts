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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/shared/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AcidentComponent } from './pages/shared/acident/acident.component';
// import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
// import { InsuaredComponent } from './pages/shared/insuared/insuared.component';
import { CustomerComponent } from './pages/shared/customer/customer.component';
import { ViewAgentComponent } from './pages/agent/view-agent/view-agent.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { ViewcustomerComponent } from './pages/shared/customer/viewcustomer/viewcustomer.component';
// import { DefaultComponent } from './framework/layouts/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    HeadnavComponent,
    // PaymentComponent,
    AgentregstrationComponent,
    LoginComponent,
    AcidentComponent,
    // InsuaranceComponent,
    // InsuaredComponent,
    CustomerComponent,
    ViewAgentComponent,
    CommissionComponent,
    ViewcustomerComponent,
    // DefaultComponent,
   
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDatatableModule ,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

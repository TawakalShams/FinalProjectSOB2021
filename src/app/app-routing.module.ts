import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './dialog/agent/agent.component';
import { CustomerPaymentComponent } from './dialog/customer-payment/customer-payment.component';
import { DashboardComponent } from './framework/dashboard/dashboard.component';
import { HeadnavComponent } from './framework/layouts/headnav/headnav.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AgentregstrationComponent } from './pages/agent/agentregstration/agentregstration.component';
import { ViewAgentComponent } from './pages/agent/view-agent/view-agent.component';
import { ViewAllUsersComponent } from './pages/agent/view-all-users/view-all-users.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { AcidentComponent } from './pages/shared/acident/acident.component';
import { ViewAcidentComponent } from './pages/shared/acident/view-acident/view-acident.component';
import { ViewPaymentPayedComponent } from './pages/shared/acident/view-payment-payed/view-payment-payed.component';
import { CustomerPaymentsComponent } from './pages/shared/customer/customer-payments/customer-payments.component';
import { CustomerComponent } from './pages/shared/customer/customer.component';
import { ViewcustomerComponent } from './pages/shared/customer/viewcustomer/viewcustomer.component';
import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
import { ViewInsuaranceComponent } from './pages/shared/insuarance/view-insuarance/view-insuarance.component';
import { InsuaredComponent } from './pages/shared/insuared/insuared.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { RegstrationComponent } from './pages/shared/modelOfCar/regstration/regstration.component';
import { ViewModelComponent } from './pages/shared/modelOfCar/view-model/view-model.component';
import { VehiclesComponent } from './pages/shared/vehicles/vehicles/vehicles.component';
import { ViewVehiclesComponent } from './pages/shared/vehicles/view-vehicles/view-vehicles.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: HeadnavComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewcustomer',
        component: ViewcustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewcustomerpayment',
        component: CustomerPaymentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'usersRegstration',
        component: AgentregstrationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'model',
        component: RegstrationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewmodel',
        component: ViewModelComponent,
        canActivate: [AuthGuard],
      },
      {
        // for Agent
        path: 'user',
        component: ViewAgentComponent,
        canActivate: [AuthGuard],
      },
      {
        // for Admin only
        path: 'users',
        component: ViewAllUsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'accident',
        component: AcidentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewacident',
        component: ViewAcidentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewinsuaredpayment',
        component: ViewPaymentPayedComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'commission',
        component: CommissionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'insuarance',
        component: InsuaranceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewinsuarance',
        component: ViewInsuaranceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'insuared',
        component: InsuaredComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'admin',
        component: AdminloginComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'vehicle',
        component: VehiclesComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'viewvehicle',
        component: ViewVehiclesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'updateagentdialog/:agentid',
        component: AgentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'image',
        component: InsuaredComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

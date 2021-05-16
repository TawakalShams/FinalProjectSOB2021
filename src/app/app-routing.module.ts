import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './dialog/agent/agent.component';
import { DashboardComponent } from './framework/dashboard/dashboard.component';
import { HeadnavComponent } from './framework/layouts/headnav/headnav.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AgentregstrationComponent } from './pages/agent/agentregstration/agentregstration.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { AcidentComponent } from './pages/shared/acident/acident.component';
import { CustomerComponent } from './pages/shared/customer/customer.component';
import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
import { InsuaredComponent } from './pages/shared/insuared/insuared.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { VehiclesComponent } from './pages/shared/vehicles/vehicles/vehicles.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
const routes: Routes = [
 
  {
    path: 'login', 
    component: LoginComponent
 },

{
  path: '',
  component: HeadnavComponent,
      children: [
        {
          path: '', 
          component: DashboardComponent,
          canActivate: [AuthGuard] 

       },
      {
      path: 'customer',
      component: CustomerComponent,
      canActivate: [AuthGuard] 
    },
  {
    path: 'agent', 
    component: AgentregstrationComponent,
    canActivate: [AuthGuard] 
 },
 {
  path: 'acident', 
  component: AcidentComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'commission', 
  component: CommissionComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'insuarance', 
  component: InsuaranceComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'insuared', 
  component: InsuaredComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'admin', 
  component: AdminloginComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'vehicle', 
  component: VehiclesComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'updateagentdialog/:agentid', 
  component: AgentComponent,
  canActivate: [AuthGuard] 
},

  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

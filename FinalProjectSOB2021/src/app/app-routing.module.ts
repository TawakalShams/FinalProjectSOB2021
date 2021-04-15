import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './framework/dashboard/dashboard.component';
import { HeadnavComponent } from './framework/layouts/headnav/headnav.component';
import { AgentregstrationComponent } from './pages/agent/agentregstration/agentregstration.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { AcidentComponent } from './pages/shared/acident/acident.component';
import { CustomerComponent } from './pages/shared/customer/customer.component';
import { InsuaranceComponent } from './pages/shared/insuarance/insuarance.component';
import { InsuaredComponent } from './pages/shared/insuared/insuared.component';
import { LoginComponent } from './pages/shared/login/login.component';

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
          component: DashboardComponent
       },
      {
      path: 'customer',
      component: CustomerComponent
    },
  {
    path: 'agent', 
    component: AgentregstrationComponent
 },
 {
  path: 'acident', 
  component: AcidentComponent
},
{
  path: 'commission', 
  component: CommissionComponent
},
{
  path: 'insuarance', 
  component: InsuaranceComponent
},
{
  path: 'insuared', 
  component: InsuaredComponent
},
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

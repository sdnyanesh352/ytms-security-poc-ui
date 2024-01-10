import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminDashboardComponent} from './modules/admin/admin-dashboard/admin-dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guard/auth.guard';
import {AssociateDashboardComponent} from './modules/associate/associate-dashboard/associate-dashboard.component';
import {AdminGuard} from "./guard/admin.guard";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userDashboard', component: AssociateDashboardComponent, canActivate: [AuthGuard]},
  {path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

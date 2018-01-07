/**
 * Created by kelvin on 11/23/16.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {UserExistsGuards} from './guards/user.exists';
import {LoginComponent} from './login/login.component';
import {PasswordComponent} from './modules/user/password/password.component';
import {ReportsComponent} from './modules/reports/reports.component';
import {UserComponent} from './modules/user/user.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {LocationComponent} from './modules/location/location.component';
import {FormsManagementComponent} from './modules/forms-management/forms-management.component';
import {DataEntryComponent} from './modules/data-entry/data-entry.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {TeamComponent} from './modules/user/team/team.component';
import {TeamMembersComponent} from './modules/user/team-members/team-members.component';
import {UsersComponent} from './modules/user/users/users.component';
import {FormsGuard} from './guards/forms.exist';
import {BasicReportsComponent} from './modules/basic-reports/basic-reports.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent ,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: 'change_password',
      component: PasswordComponent,
    }, {
      path: 'data_entry',
      canActivate: [FormsGuard],
      component: DataEntryComponent ,
    }, {
      path: 'forms',
      canActivate: [FormsGuard],
      component: FormsManagementComponent,
    }, {
      path: 'location',
      component: LocationComponent,
    }, {
      path: 'settings',
      component: SettingsComponent,
    }, {
      path: 'user',
      component: UserComponent,
      children: [
        {
        path: 'team',
        component: TeamComponent
      }, {
        path: 'users',
        component: UsersComponent
      }, {
        path: 'team_members',
        component: TeamMembersComponent
      }],

    }, {
      path: 'reports',
      canActivate: [FormsGuard],
      component: ReportsComponent,
    }, {
      path: 'basic_reports',
      canActivate: [FormsGuard],
      component: BasicReportsComponent,
    } ]
  },
  {
    path: 'login',
    component: LoginComponent ,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'HomeComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class ReportingRoutingModule { }

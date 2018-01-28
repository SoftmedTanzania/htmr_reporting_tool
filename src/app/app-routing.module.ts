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
import {AuthGuard} from './guards/auth-guards.service';
import {MappingComponent} from './modules/settings/mapping/mapping.component';
import {IndicatorComponent} from './modules/settings/indicator/indicator.component';
import {ServiceComponent} from './modules/settings/service/service.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent ,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: 'change_password',
      component: PasswordComponent,
    }, {
      path: 'data_entry',
      canActivate: [AuthGuard, FormsGuard],
      component: DataEntryComponent ,
    }, {
      path: 'forms',
      canActivate: [AuthGuard, FormsGuard],
      component: FormsManagementComponent,
    }, {
      path: 'location',
      canActivate: [AuthGuard],
      component: LocationComponent,
    }, {
      path: 'settings',
      canActivate: [AuthGuard],
      component: SettingsComponent,
      children: [
        {
          path: 'services',
          component: ServiceComponent
        }, {
          path: 'indicators',
          component: IndicatorComponent
        }, {
          path: 'indicator_service_mappings',
          component: MappingComponent
        }]
    }, {
      path: 'user',
      canActivate: [AuthGuard],
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
      canActivate: [AuthGuard, FormsGuard],
      component: ReportsComponent,
    }, {
      path: 'basic_reports',
      canActivate: [AuthGuard, FormsGuard],
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

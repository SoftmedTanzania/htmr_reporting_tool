import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { ReportingRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { environment } from '../environments/environment';
import { reducers } from './store/reducers';
import { DataService } from './shared/services/data.service';
import { HttpClientService } from './shared/services/http-client.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { CustomSerializer } from './store/reducers/router.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromGuards from './guards';
import {OrgUnitService} from './shared/services/org-unit.service';
import {VisualizerService} from './shared/services/visualizer.service';
import {FilterService} from './shared/services/filter.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './modules/user/user.component';
import { PasswordComponent } from './modules/user/password/password.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { FormsManagementComponent } from './modules/forms-management/forms-management.component';
import { LocationComponent } from './modules/location/location.component';
import { DataEntryComponent } from './modules/data-entry/data-entry.component';
import { TeamComponent } from './modules/user/team/team.component';
import { TeamMembersComponent } from './modules/user/team-members/team-members.component';
import { UsersComponent } from './modules/user/users/users.component';
import {LocationService} from './shared/services/location.service';
import {NotificationComponent} from './shared/components/notification/notification.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {OrgUnitFilterComponent} from './shared/components/org-unit-filter/org-unit-filter.component';
import {PeriodFilterComponent} from './shared/components/period-filter/period-filter.component';
import {MultiselectComponent} from './shared/components/org-unit-filter/multiselect/multiselect.component';
import {DndModule} from 'ng2-dnd';
import {Ng2HighchartsModule} from 'ng2-highcharts';
import {TreeModule} from 'angular-tree-component';
import {ClickOutsideDirective} from './shared/directives/click-outside.directive';
import { EntryFormComponent } from './modules/data-entry/entry-form/entry-form.component';
import { FormSelectionComponent } from './modules/data-entry/form-selection/form-selection.component';
import { AddLocationComponent } from './modules/location/forms/add-location/add-location.component';
import { UpdateLocationComponent } from './modules/location/forms/update-location/update-location.component';
import { AddUserComponent } from './modules/user/users/forms/add-user/add-user.component';
import { UpdateUserComponent } from './modules/user/users/forms/update-user/update-user.component';
import { AddTeamComponent } from './modules/user/team/forms/add-team/add-team.component';
import { UpdateTeamComponent } from './modules/user/team/forms/update-team/update-team.component';
import { UpdateTeamMemberComponent } from './modules/user/team-members/forms/update-team-member/update-team-member.component';
import { AddTeamMemberComponent } from './modules/user/team-members/forms/add-team-member/add-team-member.component';
import { BasicReportsComponent } from './modules/basic-reports/basic-reports.component';
import { ReportSelectionComponent } from './modules/basic-reports/report-selection/report-selection.component';
import { ReportTempleteComponent } from './modules/basic-reports/report-templete/report-templete.component';
import { ParameteSelectorComponent } from './modules/reports/paramete-selector/paramete-selector.component';
import {IndicatordisplayComponent} from './shared/components/indicatordisplay/indicatordisplay.component';
import {TableTemplateComponent} from './shared/components/table-template/table-template.component';
import {TeamService} from './shared/services/team.service';
import {UserService} from './shared/services/user.service';
import { DashboardItemComponent } from './modules/dashboard/dashboard-item/dashboard-item.component';
import {PaginationComponent} from './shared/components/pagination/pagination.component';
import {FilterByNamePipe} from './shared/pipes/filter-by-name.pipe';
import {PlaceholderComponent} from './shared/components/placeholder/placeholder.component';
import { PagerService} from './shared/services/pager.service';
import { CollectionFilterPipe } from './shared/pipes/collection-filter.pipe';
import { ServiceComponent } from './modules/settings/service/service.component';
import { IndicatorComponent } from './modules/settings/indicator/indicator.component';
import { MappingComponent } from './modules/settings/mapping/mapping.component';
import { SettingsService} from './shared/services/settings.service';
import { AddMappingComponent } from './modules/settings/mapping/forms/add-mapping/add-mapping.component';
import { AddIndicatorComponent } from './modules/settings/indicator/forms/add-indicator/add-indicator.component';
import { EditIndicatorComponent } from './modules/settings/indicator/forms/edit-indicator/edit-indicator.component';
import { AddServiceComponent } from './modules/settings/service/forms/add-service/add-service.component';
import { EditServiceComponent } from './modules/settings/service/forms/edit-service/edit-service.component';
import { FormCreationComponent } from './modules/forms-management/form-creation/form-creation.component';
import { FormUpdateComponent } from './modules/forms-management/form-update/form-update.component';
import { FormListComponent } from './modules/forms-management/form-list/form-list.component';
import { FormCuManagerComponent } from './modules/forms-management/form-cu-manager/form-cu-manager.component';
import {MultiSelectorComponent} from './modules/forms-management/multi-selector/multi-selector.component';
import {DatasetService} from './shared/services/dataset.service';
import { OrgUnitSelectorComponent } from './modules/forms-management/org-unit-selector/org-unit-selector.component';
import { CategoriesComponent } from './modules/forms-management/categories/categories.component';
import { AddCategoryComponent } from './modules/forms-management/categories/add-category/add-category.component';
import { FormItemsComponent } from './modules/forms-management/form-update/form-items/form-items.component';
import { ProvidersReportComponent } from './modules/providers-report/providers-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    PasswordComponent,
    SettingsComponent,
    DashboardComponent,
    ReportsComponent,
    FormsManagementComponent,
    LocationComponent,
    DataEntryComponent,
    TeamComponent,
    TeamMembersComponent,
    UsersComponent,
    NotificationComponent,
    LoaderComponent,
    OrgUnitFilterComponent,
    PeriodFilterComponent,
    MultiselectComponent,
    ClickOutsideDirective,
    EntryFormComponent,
    FormSelectionComponent,
    EntryFormComponent,
    AddLocationComponent,
    UpdateLocationComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddTeamComponent,
    UpdateTeamComponent,
    UpdateTeamMemberComponent,
    AddTeamMemberComponent,
    BasicReportsComponent,
    ReportSelectionComponent,
    ReportTempleteComponent,
    ParameteSelectorComponent,
    IndicatordisplayComponent,
    TableTemplateComponent,
    PaginationComponent,
    TableTemplateComponent,
    DashboardItemComponent,
    FilterByNamePipe,
    PlaceholderComponent,
    CollectionFilterPipe,
    ServiceComponent,
    IndicatorComponent,
    MappingComponent,
    AddMappingComponent,
    AddIndicatorComponent,
    EditIndicatorComponent,
    AddServiceComponent,
    EditServiceComponent,
    FormCreationComponent,
    FormUpdateComponent,
    FormListComponent,
    FormCuManagerComponent,
    MultiSelectorComponent,
    OrgUnitSelectorComponent,
    CategoriesComponent,
    AddCategoryComponent,
    FormItemsComponent,
    ProvidersReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReportingRoutingModule,
    NgxPaginationModule,
    DndModule.forRoot(),
    Ng2HighchartsModule,
    TreeModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 100}) : []
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    DataService,
    DatasetService,
    HttpClientService,
    SettingsService,
    OrgUnitService,
    VisualizerService,
    FilterService,
    LocationService,
    UserService,
    TeamService,
    PagerService,
    ...fromGuards.guards
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

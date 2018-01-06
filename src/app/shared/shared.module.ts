import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { FilterLevelPipe } from './pipes/filter-level.pipe';
import { FilterIndicatorByNamePipe } from './pipes/filter-indicator-by-name.pipe';
import { OrderPipe } from './pipes/order-by.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrgUnitFilterComponent } from './components/org-unit-filter/org-unit-filter.component';
import { PeriodFilterComponent } from './components/period-filter/period-filter.component';
import { MultiselectComponent } from './components/org-unit-filter/multiselect/multiselect.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    DndModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [
    ClickOutsideDirective,
    FilterByNamePipe,
    FilterLevelPipe,
    FilterIndicatorByNamePipe,
    OrderPipe,
    SafeHtmlPipe,
    OrgUnitFilterComponent,
    PeriodFilterComponent,
    MultiselectComponent,
  ],
  exports: [
    RouterModule,
    TreeModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    FilterByNamePipe,
    SafeHtmlPipe,
    DndModule,
    FilterLevelPipe,
    OrderPipe,
    FilterIndicatorByNamePipe,
    OrgUnitFilterComponent,
    PeriodFilterComponent,
    MultiselectComponent
  ]
})
export class SharedModule { }

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {Category} from '../../../store/categories/category.model';
import {ApplicationState} from '../../../store/reducers';
import * as categorySelector from '../../../store/categories/category.selector';
import * as categoryActions from '../../../store/categories/category.actions';
import {DatasetService} from '../../../shared/services/dataset.service';
import {fadeIn, listStateTrigger} from '../../../shared/animations/basic-animations';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    fadeIn,
    listStateTrigger
  ]
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;
  currentDeleting: any = {};
  currentEdditing: any = {};
  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.categories$ = this.store.select(categorySelector.selectAll);
  }

  ngOnInit() {
  }

  doneSavingCat(id) {
    this.currentEdditing[id] = false;
  }

  deleteCat(category) {
    this.store.dispatch(new categoryActions.DeleteCategory({id: category.id}));
  }

  saveToDatabase() {
    // add implementation to allow saving of these information to the database.
  }

}

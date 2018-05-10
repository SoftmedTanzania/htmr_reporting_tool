import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeIn, listStateTrigger} from '../../../../shared/animations/basic-animations';
import {Category} from '../../../../store/categories/category.model';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../../store/reducers';
import {DatasetService} from '../../../../shared/services/dataset.service';
import * as categoryActions from '../../../../store/categories/category.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  animations: [
    fadeIn,
    listStateTrigger
  ]
})
export class AddCategoryComponent implements OnInit {

  @Input() newCategory: Category = {
    id: '',
    name: '',
    items: []
  };
  @Output() doneSaving = new EventEmitter();
  newOption: string = '';
  constructor(
    private store: Store<ApplicationState>,
    private datasetService: DatasetService
  ) { }

  ngOnInit() {
  }

  addOption(option) {
    this.newCategory.items.push(
      {
        id: this.datasetService.generateCode(),
        name: option
      }
    );
    this.newOption = '';
  }

  saveCategory() {
    this.store.dispatch(new categoryActions.UpsertCategory({
      category: {
        id: this.newCategory.id,
        changes: {
          ...this.newCategory
        }
      }
    }));
    this.doneSaving.emit(this.newCategory.id);
    this.newCategory = {
      id: '',
      name: '',
      items: []
    };
  }

  removeItem(item) {
    const index = _.findIndex(this.newCategory.items, { id: item.id});
    const newItems = [...this.newCategory.items];
    newItems.splice(index, 1);
    this.newCategory.items = [...newItems];
    // this.saveCategory();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../../store/reducers/forms.reducer';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers/index';
import {DeleteForms, LoadForms} from '../../../store/actions/forms.actions';
import * as formSelectors from '../../../store/forms/form.selector';
import {Go} from '../../../store/actions/router.action';
import {AddNewForm, ClearNewForms, SetSelectedForm} from '../../../store/new-form/new-form.actions';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  storeResources: any;
  constructor(private store: Store<ApplicationState>) {
    this.forms$ = store.select( formSelectors.selectAll );
    this.loading$ = store.select( formSelectors.selectLoading );
    // store.select( formSelectors.getStoreResources).subscribe((dataStore) => {
    //   this.storeResources = dataStore;
    // });
  }

  ngOnInit() {
  }

  deleteForm (form) {
    console.log('deleting form ');
  }

  updateForm(form) {
    this.store.dispatch(new ClearNewForms());
    this.store.dispatch(new AddNewForm({newForm: form}));
    this.store.dispatch(new Go({path: ['home', 'forms', form.id, 'update']}));
  }
}

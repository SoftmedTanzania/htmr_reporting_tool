import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../../store/reducers/forms.reducer';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers/index';
import {DeleteForms, LoadForms} from '../../../store/actions/forms.actions';
import * as formSelectors from '../../../store/selectors/forms.selectors';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  storeResources:any;
  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
    this.forms$ = store.select( formSelectors.getFormsList );
    this.loading$ = store.select( formSelectors.getFormsLoading );
    store.select( formSelectors.getStoreResources).subscribe((dataStore) =>{
      this.storeResources = dataStore;
    });
  }

  ngOnInit() {
  }

  deleteForm(form){
    this.store.dispatch(new DeleteForms({form: form, dataStore: this.storeResources }));

  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../../store/reducers/forms.reducer';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers/index';
import {LoadForms} from '../../../store/actions/forms.actions';
import * as formSelectors from '../../../store/selectors/forms.selectors';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
    this.forms$ = store.select( formSelectors.getFormsList );
    this.loading$ = store.select( formSelectors.getFormsLoading );
  }

  ngOnInit() {
  }
}

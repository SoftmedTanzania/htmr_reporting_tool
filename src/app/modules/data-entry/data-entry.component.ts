import { Component, OnInit } from '@angular/core';
import {LoadForms} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../store/reducers/forms.reducer';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {

  forms$: Observable<Forms[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
  }

  ngOnInit() {
  }

}

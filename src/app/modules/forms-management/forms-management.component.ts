import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers';
import {LoadForms} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../store/reducers/forms.reducer';
import {Go} from '../../store/actions/router.action';
import {AddNewForm, ClearNewForms} from '../../store/new-form/new-form.actions';

@Component({
  selector: 'app-forms-management',
  templateUrl: './forms-management.component.html',
  styleUrls: ['./forms-management.component.css']
})
export class FormsManagementComponent implements OnInit {

  constructor(
    private store: Store<ApplicationState>
  ) {
  }

  ngOnInit() {
  }

  createForm() {
    const form = {
      id: this.makeid(),
      name: '',
      datasetId: this.makeid(),
      periodType: 'Monthly',
      sections: []
    };
    this.store.dispatch(new ClearNewForms());
    this.store.dispatch(new AddNewForm({newForm: form}));
    this.store.dispatch(new Go({path: ['home', 'forms', form.id, 'update']}));
  }

  // generate a random list of Id for use as scorecard id
  makeid(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }


}

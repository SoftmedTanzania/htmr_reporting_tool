import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/reducers';
import {LoadForms} from '../../store/actions/forms.actions';
import * as formSelectors from '../../store/selectors/forms.selectors';

@Component({
  selector: 'app-forms-management',
  templateUrl: './forms-management.component.html',
  styleUrls: ['./forms-management.component.css']
})
export class FormsManagementComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
    store.select(formSelectors.getDataelementsList).subscribe((item) => {
      console.log(item);
    });
  }

  ngOnInit() {
  }

}

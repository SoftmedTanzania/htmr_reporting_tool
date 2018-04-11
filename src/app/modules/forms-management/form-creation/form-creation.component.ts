import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Forms} from '../../../store/reducers/forms.reducer';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/reducers/index';
import {CreateForms, LoadForms} from '../../../store/actions/forms.actions';
import * as formSelectors from '../../../store/selectors/forms.selectors';
@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit {
  availableDataElements: any = [];
  selectedDataElements: any = [];
  availableCategories: any = [];
  selectedCategories: any = [];
  forms: Forms[];
  storeResources: Array<any> = [];
  loading$: Observable<boolean>;
  organisationUnits: any = [];

  constructor(private store: Store<ApplicationState>) {
    store.dispatch(new LoadForms());
    store.select(formSelectors.getDataelementsList).subscribe((elements) => {
      this.availableDataElements = elements;
    });
    store.select(formSelectors.getCategoriesList).subscribe((categories) => {
      this.availableCategories = categories;
    });
    store.select(formSelectors.getForms).subscribe((forms: any) => {
      console.log('FORMS');
      console.log(forms);
      this.forms = forms;
    });

    store.select(formSelectors.getStoreResources).subscribe((resources: any) => {
      this.storeResources = resources;
    });

    this.loading$ = store.select(formSelectors.getFormsLoading);
  }

  ngOnInit() {
  }

  onNewFormCreate(formTemplate) {
    this.store.dispatch( new CreateForms({dataSet: formTemplate, entryForms: this.storeResources}));
  }

}

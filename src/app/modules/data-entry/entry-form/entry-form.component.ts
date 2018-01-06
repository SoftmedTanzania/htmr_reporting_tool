import {Component, Input, OnInit} from '@angular/core';
import {DataElement, FormCategory, Forms} from '../../../store/reducers/forms.reducer';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  @Input() form: Forms;
  @Input() dataElements: DataElement;
  @Input() categories: FormCategory;
  constructor() { }

  ngOnInit() {
  }

}

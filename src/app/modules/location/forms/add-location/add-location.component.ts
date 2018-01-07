import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '../../../../shared/models/location';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  @Input() locationForm;
  @Input() locations: Location[];
  @Output() formSubmissionEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(){
    this.formSubmissionEvent.emit(this.locationForm);
  }

}

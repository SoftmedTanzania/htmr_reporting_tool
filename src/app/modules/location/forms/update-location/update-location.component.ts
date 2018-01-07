import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '../../../../shared/models/location';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {

  @Input() locationForm;
  @Input() locations: Location[];
  @Output() formSubmissionEvent = new EventEmitter();
  locationFormUpdate: FormGroup;

  constructor(private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    this.locationFormUpdate = this.formBuilder.group(
      {
        name: [this.locationForm.value['name'], Validators.required],
        description: this.locationForm.value['description'],
        parentLocation: this.locationForm.value['parentLocation'].uuid,
        tagOne: this.getAppropriateTag('tagOne', this.locationForm.value['tags']),
        tagTwo: this.getAppropriateTag('tagTwo', this.locationForm.value['tags'])
      });
    // this.locationFormUpdate = this.locationForm;
  }

  onSubmit() {
    this.formSubmissionEvent.emit(this.locationForm);
  }


  getAppropriateTag(formTagName, tagsArray) {
    console.log(tagsArray);
    return formTagName === 'tagOne' ? true : false;
  }


}

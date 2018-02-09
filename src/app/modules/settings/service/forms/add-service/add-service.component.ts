import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  @Input() services;
  @Input() serviceForm;
  @Output() formSubmissionEvent = new EventEmitter;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.serviceForm = this.formBuilder.group(
      {
        referralServiceName: ['', Validators.required],
        referralCategoryName: ['', Validators.required],
        isActive: true,
      }
    );
  }

  submit(indicatorForm) {
    this.formSubmissionEvent.emit(indicatorForm);
  }

}

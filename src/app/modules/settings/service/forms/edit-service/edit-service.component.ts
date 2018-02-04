import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  @Input() services;
  @Input() serviceForm;
  @Output() formSubmissionEvent = new EventEmitter;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {

  }

  submit(indicatorForm) {
    this.formSubmissionEvent.emit(indicatorForm);
  }
}

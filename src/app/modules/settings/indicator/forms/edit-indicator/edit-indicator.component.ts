import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-indicator',
  templateUrl: './edit-indicator.component.html',
  styleUrls: ['./edit-indicator.component.css']
})
export class EditIndicatorComponent implements OnInit {


  @Input() indicator;
  @Input() indicators;
  @Input() indicatorForm;
  @Output() formSubmissionEvent = new EventEmitter;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {

  }

  submit(indicatorForm) {
    this.formSubmissionEvent.emit(indicatorForm);
  }
}

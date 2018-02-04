import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-indicator',
  templateUrl: './add-indicator.component.html',
  styleUrls: ['./add-indicator.component.css']
})
export class AddIndicatorComponent implements OnInit {

  @Input() indicators;
  @Input() indicatorForm;
  @Output() formSubmissionEvent = new EventEmitter;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.indicatorForm = this.formBuilder.group(
      {
        referralIndicatorName: ['', Validators.required],
        isActive: [true, Validators.required]
      }
    );
  }

  submit(indicatorForm) {
    this.formSubmissionEvent.emit(indicatorForm);
  }

}

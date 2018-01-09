import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../../../../shared/models/team';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @Input() addTeamForm: FormGroup;
  teamForm: FormGroup;
  @Input() locations;
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;


  constructor(private formBuilder: FormBuilder) {
    this.teamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamIdentifier: [this.getUID()],
      location: ['', Validators.required],
      supervisor: ['']
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.formSubmissionEvent.emit(this.teamForm);
  }

  showNewPersonFrom() {
    this.showNewPersonForm = true;
  }

  changeRole(roleCounter, itemcounter) {
    this.roles[roleCounter].roleItems[itemcounter].selected = !this.roles[roleCounter].roleItems[itemcounter].selected;
  }


  getUID() {

    return 'Team-' + this.unreadableUID();
  }

  private unreadableUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}

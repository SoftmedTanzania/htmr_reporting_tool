import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../../../../shared/models/team';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @Input() teamForm;
  @Input() teams: Team[];
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;

  constructor() {
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
}

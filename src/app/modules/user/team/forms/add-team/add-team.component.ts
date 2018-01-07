import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamMember} from '../../../../../shared/models/team-member';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @Input() teamMemberForm;
  @Input() teamMembers: TeamMember[];
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;

  constructor() {
  }

  ngOnInit() {
    console.log(this.roles);
  }

  onSubmit() {
    this.formSubmissionEvent.emit(this.teamMemberForm);
  }

  showNewPersonFrom() {
    this.showNewPersonForm = true;
  }

  changeRole(roleCounter, itemcounter) {
    this.roles[roleCounter].roleItems[itemcounter].selected = !this.roles[roleCounter].roleItems[itemcounter].selected;
  }
}

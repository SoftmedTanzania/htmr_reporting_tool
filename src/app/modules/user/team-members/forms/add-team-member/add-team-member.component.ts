import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamMember} from '../../../../../shared/models/team-member';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {
  @Input() teamMemberForm;
  @Input() teamMembers: TeamMember[];
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;

  constructor() { }

  ngOnInit() {
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

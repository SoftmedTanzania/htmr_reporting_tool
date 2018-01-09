import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamMember} from '../../../../../shared/models/team-member';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {

  teamMemberForm: FormGroup;
  @Input() roles: Array<any>;
  @Input() teams: Array<any>;
  @Input() locations: Array<any>;
  @Input() teamMembers: TeamMember[];
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.teamMemberForm = this.formBuilder.group({
      firstName: [''],
      familyName: [''],
      gender: [''],
      age: [''],
      username: [''],
      password: [''],
      confirmPassword: [''],
      roles: [''],
      team: [''],
      teamRole: [''],
      assignedLocation: [''],
      isProvider: ['']
    });
  }


  onSubmit() {
    this.formSubmissionEvent.emit(this.teamMemberForm);
  }

  showNewPersonFrom() {
    this.showNewPersonForm = true;
  }

  changeRole($event, roleCounter, itemcounter) {
    $event.preventDefault();
    console.log(roleCounter, this.roles[roleCounter]);
    this.roles[roleCounter].roleItems[itemcounter].selected = !this.roles[roleCounter].roleItems[itemcounter].selected;
  }

}

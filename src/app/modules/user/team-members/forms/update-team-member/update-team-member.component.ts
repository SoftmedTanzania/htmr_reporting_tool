import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TeamMember} from '../../../../../shared/models/team-member';

@Component({
  selector: 'app-update-team-member',
  templateUrl: './update-team-member.component.html',
  styleUrls: ['./update-team-member.component.css']
})
export class UpdateTeamMemberComponent implements OnInit {


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

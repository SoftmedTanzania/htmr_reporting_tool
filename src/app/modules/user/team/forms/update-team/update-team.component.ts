import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../../../../shared/models/team';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  @Input() team;
  @Input() locations;
  @Input() teams: Team[];
  @Output() formSubmissionEvent = new EventEmitter();
  @Input() roles: Array<any>;
  teamFormUpdate: any;

  constructor(private formBuiler: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.team);
    this.teamFormUpdate = this.formBuiler.group({
      uuid: [this.team.uuid],
      teamName: [this.team.teamName],
      location: [this.team.location.uuid],
      supervisor: [this.team.supervisor.uuid]
    });
  }

  onSubmit() {
    this.formSubmissionEvent.emit(this.teamFormUpdate);
  }

}

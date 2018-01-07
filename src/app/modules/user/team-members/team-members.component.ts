import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  teamMembers = [
    {
      identifier: '1',
      role: 'test',
      team: 'test 1',
      locations: '',
      sub_teams: '',
      is_data_provider: '',
      voiced: '',
      patients: ''
    }
  ]

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

}

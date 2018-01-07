import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Array<any> = [
    {
      identifier: 'superviser',
      name: 'Superviser',
      owns_team: 'true',
      reported_to: '',
      reported_by: 'CHW',
      voiced: 'false',
      members: '1'
    }
  ];

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

}

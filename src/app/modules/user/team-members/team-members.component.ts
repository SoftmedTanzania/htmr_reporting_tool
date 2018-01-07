import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

}

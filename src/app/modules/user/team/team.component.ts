import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

}

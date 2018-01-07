import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';
import {FormGroup} from '@angular/forms';
import {Team} from '../../../shared/models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Array<any> = [];

  loading = false;
  updating = false;
  deleting = false;
  updatingIsError = false;
  deletingIsError = false;
  loadingIsError = false;
  formReference: any;
  notify = false;
  loadingMessage = '';
  showEditForm = false;
  showAddForm = false;
  teamMemberForm: FormGroup;

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadingIsError = false;
    this.notify = false;
    this.loadingMessage = this.teamService.loadingMessage;
    this.teamService.listTeams().subscribe((results) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.teams = this._prepareTeams(results);
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    })
  }

  private _prepareTeams(results): Array<Team> {
    const teams: Array<Team> = [];
    if (results.results && results.results.length > 0) {
      results.results.forEach(team => {
        teams.push(
          {
            identifier: team.teamIdentifier,
            name: team.teamName,
            owns_team: '',
            location: team.location.name,
            reported_to: '',
            supervisor: team.teamIdentifier,
            reported_by: '',
            voiced: team.voiced,
            members: team.members,
            confirmDelete: false
          }
        )
      })
    }
    return teams;
  }

  /**
   * Close and reset the form
   * */
  closeForm() {
    this.notify = false;
    this.showAddForm = false;
    this.showEditForm = false;
    this.resetForm();
  }


  resetForm() {
  }

  clearVariables() {

    setTimeout(() => {
      this.updatingIsError = false;
      this.updating = false;
      this.notify = false;
    }, 3000);

  }

  showAddFormTemplate() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showEditFormTemplate(editedLocation) {
    this.showEditForm = true;
    this.showAddForm = false;

  }

  submit() {
    this.formReference.click();
  }

  renderRoles(roles) {
    let tagString = '';
    roles.forEach((tag) => {
      tagString += ',' + tag.display;
    });
    tagString = tagString.length > 0 ? tagString.substr(1, tagString.length) : '';
    return tagString;
  }


}

import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  teamMembers: Array<any>;

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
    this.loadingMessage = 'Loading Team Members';
    this.teamService.listTeamMembers().subscribe((results) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.teamMembers = this._prepareTeamMembers(results);
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });
  }

  private _prepareTeamMembers(results): any {
    const teamMembers = [];
    console.log(results.results);
    if (results.results && results.results.length > 0) {
      results.results.forEach((teamMember) => {
        teamMembers.push(
          {
            identifier: teamMember.identifier,
            role: teamMember.teamRole.display,
            team: teamMember.display,
            locations: teamMember.locations,
            sub_teams: teamMember.subTeams,
            is_data_provider: teamMember.isDataProvider,
            voiced: teamMember.voiced,
            patients: teamMember.patients,
            confirmDelete: false
          }
        );
      });
    }
    return teamMembers;
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

import {Component, ElementRef, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Team} from '../../../shared/models/team';
import {LocationService} from '../../../shared/services/location.service';
import {PagerService} from '../../../shared/services/pager.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams: Array<any> = [];
  pagedTeams: Array<any> = [];

  // pager object
  pager: any = {};

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
  teamForm: FormGroup;
  team: Team;

  locations: Array<any> = [];

  constructor(private teamService: TeamService,
              private formBuilder: FormBuilder,
              private locationService: LocationService,
              private pagerService: PagerService,
              private elementRef: ElementRef) {

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
      this.setPage(1);
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });

    this.locationService.loadLocations().subscribe((locations) => {
      this.locations = locations;
    }, (error) => {

    });

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.teams.length, page);

    // get current page of items
    this.pagedTeams = this.teams.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  private _prepareTeams(results): Array<Team> {
    const teams: Array<Team> = [];
    if (results.results && results.results.length > 0) {
      results.results.forEach(team => {
        teams.push(
          {
            uuid: team.uuid,
            identifier: team.teamIdentifier,
            teamName: team.teamName,
            owns_team: '',
            location: team.location,
            reported_to: '',
            supervisor: team.supervisor,
            reported_by: '',
            voiced: team.voiced,
            members: team.members,
            confirmDelete: false
          }
        );
      });
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
    // this.resetForm();
    const closeForm = this.elementRef.nativeElement.querySelector('#closeForm');
    closeForm.click();
  }


  resetForm() {
    this.teamForm.reset();
  }

  clearVariables() {

    setTimeout(() => {
      this.updatingIsError = false;
      this.updating = false;
      this.notify = false;
      this.loading = false;
      this.updating = false;
      this.deleting = false;
      this.updatingIsError = false;
      this.deletingIsError = false;
      this.loadingIsError = false;
    }, 3000);

  }

  showAddFormTemplate() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showEditFormTemplate(team) {
    this.showEditForm = true;
    this.showAddForm = false;
    this.team = team;

  }

  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#teamFormButton');
    this.formReference.click();
  }

  deleteTeam(team) {
    this.updating = true;
    this.deletingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Deleting Team';
    this.teamService.deleteTeam(team).subscribe((success) => {
      this.updating = false;
      this.deletingIsError = false;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
      this.teamService.listTeams().subscribe((results) => {
        this.teams = this._prepareTeams(results);
      }, (error) => {

      });
    }, (error) => {
      this.updating = false;
      this.deletingIsError = true;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });
  }

  onSubmit($event) {
    this.updating = true;
    this.loadingMessage = 'Creating Team';
    const teamObject = $event.value;
    const team = {
      teamName: teamObject.teamName,
      teamIdentifier: teamObject.teamIdentifier,
      location: teamObject.location,
      supervisor: teamObject.supervisor
    }

    this.teamService.createTeam(team).subscribe((success) => {
      this.updating = false;
      this.updatingIsError = false;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.closeForm();
      this.teamService.listTeams().subscribe((results) => {
        this.loading = false;
        this.notify = true;
        this.loadingIsError = false;
        this.loadingMessage = this.teamService.loadingMessage;
        this.teams = this._prepareTeams(results);
        this.clearVariables();

      }, (error) => {
        this.clearVariables();
      });
    }, (error) => {
      this.updating = false;
      this.updatingIsError = true;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });

  }

  onSubmitUpdate($event) {
    this.updating = true;
    this.loadingMessage = 'Updating Team';
    const teamObject = $event.value;
    const team = {
      uuid: teamObject.uuid,
      teamName: teamObject.teamName,
      teamIdentifier: teamObject.teamIdentifier,
      location: teamObject.location,
      supervisor: teamObject.supervisor
    }

    this.teamService.updateTeam(team, team.uuid).subscribe((success) => {
      this.updating = false;
      this.updatingIsError = false;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.teamService.listTeams().subscribe((results) => {
        this.loading = false;
        this.notify = true;
        this.updatingIsError = false;
        this.loadingMessage = this.teamService.loadingMessage;
        this.teams = this._prepareTeams(results);
        this.clearVariables();

      }, (error) => {
        this.clearVariables();
      });
      this.closeForm();
    }, (error) => {
      this.updating = false;
      this.updatingIsError = true;
      this.notify = true;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });

  }

  renderRoles(roles) {
    let tagString = '';
    roles.forEach((tag) => {
      tagString += ',' + tag.display;
    });
    tagString = tagString.length > 0 ? tagString.substr(1, tagString.length) : '';
    return tagString;
  }

  getUID() {

    return 'Team-' + this.unreadableUID();
  }

  private unreadableUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}

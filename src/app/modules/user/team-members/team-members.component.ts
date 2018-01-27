import {Component, ElementRef, OnInit} from '@angular/core';
import {TeamService} from '../../../shared/services/team.service';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {LocationService} from '../../../shared/services/location.service';
import {Location} from '../../../shared/models/location';
import {Team} from '../../../shared/models/team';
import {Person} from '../../../shared/models/person';
import {PagerService} from '../../../shared/services/pager.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  teamMembers: Array<any>;
  extraTeamMembers: Array<any>;
  pagedTeamMembers: Array<any>;


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
  roles: Array<any>;
  teams: Array<Team>;
  locations: Array<Location>;

  personObject: any;
  userObject: any;
  searchText: any;
  teamMemberObject: any;


  constructor(private teamService: TeamService,
              private userService: UserService,
              private pagerService: PagerService,
              private locationService: LocationService, private elementRef: ElementRef) {
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
      this.extraTeamMembers = this._prepareTeamMembers(results);
      this.clearVariables();
      this.setPage(1);
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.teamService.loadingMessage;
      this.clearVariables();
    });

    this.teamService.listTeams().subscribe((response) => {
      this.teams = this._prepareTeams(response);
    })

    this.userService.listRoles().subscribe((response) => {
      this.roles = this._prepareUserRoles(response);
    }, (error) => {
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
    this.pager = this.pagerService.getPager(this.teamMembers.length, page);

    // get current page of items
    this.pagedTeamMembers = this.teamMembers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  private _prepareUserRoles(response): Array<any> {
    const roles: any[] = [];
    let items: any[] = [];
    const trailingItems = [];
    if (response.results.length > 0) {
      const results = response.results;
      results.forEach((role, index) => {
        if (index < 2) {
          trailingItems.push(
            {name: role.name, uuid: role.uuid, selected: false}
          );
        } else if (index % 4 === 1) {
          items.push(
            {name: role.name, uuid: role.uuid, selected: false}
          );
          roles.push({roleItems: items});
          items = [];
        } else {
          items.push(
            {name: role.name, uuid: role.uuid, selected: false}
          );
        }

      });
    }
    roles.push({roleItems: trailingItems});
    return roles;
  }


  private _prepareTeamMembers(results): any {
    const teamMembers = [];
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

  private _prepareTeams(results): any {
    const teams = [];
    if (results.results && results.results.length > 0) {
      results.results.forEach((team) => {
        teams.push(team);
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

  onSubmit($event) {
    const formData = $event.value;
    const person = {
      names: [{givenName: formData.firstName, familyName: formData.familyName}],
      gender: formData.gender,
      age: formData.age
    }
    this.updating = true;
    this.updatingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Creating person';
    this.userService.createPerson(person).subscribe((personResponse) => {
      this.personObject = personResponse;

      const userObject =
        {
          password: formData.password,
          person: this.personObject.uuid,
          roles: null,
          username: formData.username
        }

      this.userService.createUser(userObject).subscribe((userResponse) => {
        this.userObject = userResponse;

        const teamMember =
          {
            person: this.personObject.uuid,
            teamRole: '',
            locations: [{uuid: formData.assignedLocation}],
            team: formData.team
          };

        this.teamService.createTeamMember(teamMember).subscribe((teamMemberResponse) => {
          console.log(teamMemberResponse);
        }, (teamMemberError) => {

        });
      }, (userError) => {
      });
    }, (error) => {
      this.updating = false;
      this.updatingIsError = true;
      // this.notify = true;
      this.loadingMessage = this.userService.loadingMessage;
      this.clearVariables();
    });
  }

  onSubmitUpdate($event) {
    // const formData = $event.value;
    // const person = {
    //   names: [{givenName: formData.firstName, familyName: formData.familyName}],
    //   gender: formData.gender,
    //   age: formData.age
    // }
    // this.updating = true;
    // this.updatingIsError = false;
    // this.notify = false;
    // this.loadingMessage = 'Creating person';
    // this.userService.createPerson(person).subscribe((personResponse) => {
    //   this.personObject = personResponse;
    //
    //   const userObject =
    //     {
    //       password: formData.password,
    //       person: this.personObject.uuid,
    //       roles: null,
    //       username: formData.username
    //     }
    //
    //   this.userService.createUser(userObject).subscribe((userResponse) => {
    //     this.userObject = userResponse;
    //
    //     const teamMember =
    //       {
    //         person: this.personObject.uuid,
    //         teamRole: '',
    //         locations: [{uuid: formData.assignedLocation}],
    //         team: formData.team
    //       };
    //
    //     this.teamService.createTeamMember(teamMember).subscribe((teamMemberResponse) => {
    //       console.log(teamMemberResponse);
    //     }, (teamMemberError) => {
    //
    //     });
    //   }, (userError) => {
    //   });
    // }, (error) => {
    //   this.updating = false;
    //   this.updatingIsError = true;
    //   // this.notify = true;
    //   this.loadingMessage = this.userService.loadingMessage;
    //   this.clearVariables();
    // });
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
    this.formReference = this.elementRef.nativeElement.querySelector('#teamMemberFormButton');
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


  search(event) {
    this.teamMembers = this.extraTeamMembers;
    if (this.searchText !== undefined){
      this.teamMembers = this.pagerService.filterCollection(this.teamMembers, this.searchText, 'team');
    }
    this.setPage(1);
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../shared/models/person';
import {PagerService} from '../../../shared/services/pager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  extraUsers: User[] = [];
  pagedUsers: User[] = [];


  // pager object
  pager: any = {};


  persons: Person[];
  roles: any = [];
  updatingRoles: any = [];
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
  userForm: FormGroup;
  updateUserForm: FormGroup;

  personObject: any;
  userObject: any;
  updatedUser: any;
  teamMemberObject: any;
  searchText: any;

  constructor(private userService: UserService,
              private pagerService: PagerService,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        familyName: ['', Validators.required],
        gender: ['', Validators.required],
        age: '',
        dateOfBirth: '',
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        username: '',
        roles: []
      });

  }

  ngOnInit() {

    this.loading = true;
    this.loadingIsError = false;
    this.notify = false;
    this.loadingMessage = this.userService.loadingMessage;
    this.userService.listUsers().subscribe((response) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.userService.loadingMessage;
      this.users = this._prepareUsers(response);
      this.extraUsers = this._prepareUsers(response);
      this.setPage(1);
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = true;
      this.loadingMessage = error;
      this.clearVariables();
    });


    this.userService.listRoles().subscribe((response) => {
      this.roles = this._prepareUserRoles(response);
    }, (error) => {
    });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.length, page);

    // get current page of items
    this.pagedUsers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  private _prepareUsers(response): User[] {
    const users: User[] = [];
    if (response.results && response.results.length > 0) {
      const results = response.results;
      results.forEach((user) => {
        users.push(
          {
            uuid: user.uuid,
            username: user.username,
            person: user.person,
            roles: user.roles,
            systemId: user.systemId,
            confirmDelete: false
          }
        );
      });
    }
    return users;
  }


  private _prepareUserRoles(response): Array<any> {
    const roles: any[] = [];
    let items: any[] = [];
    if (response.results.length > 0) {
      const results = response.results;
      let rowCounter = 0;
      let itemCounter = 0;
      results.forEach((role, index) => {
        itemCounter++;
        items.push(
          {name: role.name, uuid: role.uuid, selected: false}
        );

        if (itemCounter === 4) {
          itemCounter = 0;
          rowCounter++;
          roles.push({roleItems: items, rowNo: rowCounter});
          items = [];
        } else if (index === results.length - 1) {
          roles.push({roleItems: items});
        }

      });
    }
    return roles;
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

  showEditFormTemplate(user) {
    this.showEditForm = true;
    this.showAddForm = false;
    this.updatedUser = this.prepareUpdateUser(user);
    this.updatingRoles = this.prepareRoles(this.updatedUser.roles, this.roles);

    this.updateUserForm = this.formBuilder.group(
      {
        personUUID: [this.updatedUser.personUUID, Validators.required],
        uuid: [user.uuid, Validators.required],
        firstName: [this.updatedUser.firstName, Validators.required],
        familyName: [this.updatedUser.familyName, Validators.required],
        gender: [this.updatedUser.gender, Validators.required],
        age: this.updatedUser.age,
        dateOfBirth: '',
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        username: this.updatedUser.username,
        roles: ''
      });

  }

  prepareRoles(rolesInput, rolesList): Array<any> {
    let newRolesList: Array<any> = [];
    const roles: Array<any> = [];
    const rolesSource = rolesInput.split('_');
    rolesSource.forEach((role) => {
      if (role.length > 0) {
        roles.push(role);
      }
    });

    newRolesList = rolesList.map((role: any) => {
      role.roleItems.forEach((item) => {
        roles.forEach(roleUUID => {
          if (item.uuid === roleUUID) {
            item.selected = true;
          }
          return item;
        });
      });
      return role;
    });

    return newRolesList;
  }

  prepareUpdateUser(user) {
    const displayNames = user.person.display.split(' ');
    const roles = user.roles;
    let roleString = '';

    roles.forEach((role) => {
      roleString += role.uuid + '_';
    })

    return {
      personUUID: user.person.uuid,
      firstName: displayNames.length > 0 ? displayNames[0] : '',
      familyName: displayNames.length > 1 ? displayNames[1] : '',
      gender: user.person.gender,
      age: user.person.age,
      username: user.username,
      roles: roleString
    };
  }

  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#userFormButton');
    this.formReference.click();
  }


  onSubmit($event) {
    const formData = $event.value;
    const person = {
      names: [{givenName: formData.firstName, familyName: formData.familyName}],
      gender: formData.gender,
      age: formData.age
    };

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
          roles: formData.roles,
          username: formData.username
        };

      this.userService.createUser(userObject).subscribe((userResponse) => {
        this.userObject = userResponse;
        this.updating = false;
        this.updatingIsError = false;
        this.notify = true;
        this.loadingMessage = this.userService.loadingMessage;

        this.userService.listUsers().subscribe((users) => {
          this.closeForm();
          this.updating = false;
          this.updatingIsError = false;
          this.notify = true;
          this.loadingMessage = this.userService.loadingMessage;
          this.users = this._prepareUsers(users);
          this.extraUsers = this._prepareUsers(users);
          this.setPage(1);
          this.clearVariables();
        }, (error) => {
          this.loading = false;
          this.notify = true;
          this.loadingIsError = true;
          this.loadingMessage = this.userService.loadingMessage;
          this.clearVariables();
        });

      }, (userError) => {
      });
    }, (error) => {
      this.updating = false;
      this.updatingIsError = true;
      this.notify = true;
      this.loadingMessage = this.userService.loadingMessage;
      this.clearVariables();
    });
  }

  onUpdateSubmit($event) {
    const formData = $event.value;
    const person = {
      names: [{givenName: formData.firstName, familyName: formData.familyName}],
      gender: formData.gender,
      age: formData.age
    };

    this.updating = true;
    this.updatingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Updating User';
    this.userService.updatePerson(person, formData.personUUID).subscribe((response) => {

      const userObject = {};
      if (formData.password && formData.password !== '') {
        userObject['password'] = formData.password;
        userObject['roles'] = formData.roles;
      } else {
        userObject['roles'] = formData.roles;
      }

      this.userService.updateUser(userObject, formData.uuid).subscribe((userResponse) => {
        this.loadingMessage = 'Updating user successfully';

        this.userService.listUsers().subscribe((users) => {
          this.closeForm();
          this.updating = false;
          this.updatingIsError = false;
          this.notify = true;
          this.loadingMessage = this.userService.loadingMessage;
          this.users = this._prepareUsers(users);
          this.extraUsers = this._prepareUsers(users);
          this.setPage(1);
          this.clearVariables();
        }, (error) => {
          this.loading = false;
          this.notify = true;
          this.loadingIsError = true;
          this.loadingMessage = this.userService.loadingMessage;
          this.clearVariables();
        });

      }, (userError) => {
        this.loading = false;
        this.notify = true;
        this.loadingIsError = true;
        this.loadingMessage = this.userService.loadingMessage;
      });

    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = true;
      this.loadingMessage = this.userService.loadingMessage;
    });

  }

  deleteUser(user) {

    this.deleting = true;
    this.deletingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Deleting user';
    this.userService.deleteUser(user).subscribe((response) => {

      this.userService.listUsers().subscribe((responseUsers) => {
        this.users = this._prepareUsers(responseUsers);
        this.extraUsers = this._prepareUsers(responseUsers);
        this.setPage(1);
      }, (error) => {

      });

      this.deleting = false;
      this.deletingIsError = false;
      this.notify = true;
      this.loadingMessage = this.userService.loadingMessage;
      this.clearVariables();
    }, (error) => {

      this.deleting = false;
      this.deletingIsError = true;
      this.notify = true;
      this.loadingMessage = this.userService.loadingMessage;
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


  search(event) {
    this.users = this.extraUsers;
    if (this.searchText !== undefined) {
      this.users = this.pagerService.filterCollection(this.users, this.searchText, 'person.display');
    }
    this.setPage(1);
  }


}

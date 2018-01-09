import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../shared/models/person';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  persons: Person[];
  roles: any = [];
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

  constructor(private userService: UserService,
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
      this.clearVariables();
    }, (error) => {
      this.loading = false;
      this.notify = true;
      this.loadingIsError = true;
      this.loadingMessage = this.userService.loadingMessage;
      this.clearVariables();
    });


    this.userService.listRoles().subscribe((response) => {
      this.roles = this._prepareUserRoles(response);
    }, (error) => {
    });
  }

  private _prepareUsers(response): User[] {
    const users: User[] = [];
    if (response.results.length > 0) {
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
    this.formReference = this.elementRef.nativeElement.querySelector('#userFormButton');
    this.formReference.click();
  }


  onSubmit($event) {
    const formData = $event.value;
    const person: any = {
      names: [{givenName: formData.firstName, familyName: formData.familyName}],
      gender: formData.gender,
      age: formData.age
    }
    this.updating = true;
    this.updatingIsError = false;
    this.notify = false;
    this.loadingMessage = 'Creating person';
    this.userService.createPerson(person).subscribe((response) => {
      console.log(response);
      this.updating = false;
      this.updatingIsError = false;
      // this.notify = true;
      this.loadingMessage = this.userService.loadingMessage;
      this.clearVariables();
    }, (error) => {
      this.updating = false;
      this.updatingIsError = true;
      // this.notify = true;
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

}

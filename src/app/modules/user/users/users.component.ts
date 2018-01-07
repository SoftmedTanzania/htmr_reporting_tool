import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
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
        middleName: ['', Validators.required],
        gender: ['', Validators.required],
        age: '',
        dateOfBirth: '',
        password: '',
        username: '',
        roles:[]
      });

  }

  ngOnInit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#userFormButton');
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

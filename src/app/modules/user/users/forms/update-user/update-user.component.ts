import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../../shared/models/user';
import {Person} from '../../../../../shared/models/person';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @Input() userForm;
  @Input() user;
  @Input() users: User[];
  @Input() person: Person;
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;
  formReference: any;
  searchText: any;
  searchTextError: boolean = false;
  updatedRoles: Array<any> = [];
  private selectedRoles = [];

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  }

  onSubmit() {
    this.selectedRoles = [];
    this.roles.forEach((role) => {
      role.roleItems.forEach(item => {
        if (item.selected) {
          this.selectedRoles.push(item.uuid);
        }
      });
    });
    this.userForm.value.roles = this.selectedRoles;
    console.log(this.userForm.value.roles)
    this.formSubmissionEvent.emit(this.userForm);
  }

  showNewPersonFrom() {
    this.showNewPersonForm = true;
  }

  changeRole($event, roleCounter, itemcounter) {
    $event.preventDefault();
    this.roles[roleCounter].roleItems[itemcounter].selected = !this.roles[roleCounter].roleItems[itemcounter].selected;

    this.roles.forEach((role) => {
      role.roleItems.forEach(item => {
        if (item.selected) {
          this.selectedRoles.push(item.uuid);
        }
      });
    });
  }

  searchPerson() {
    this.searchTextError = false;
    this.formReference = this.elementRef.nativeElement.querySelector('#searchPersonText');
    this.searchText = this.formReference.value;

    if (this.searchText === '') {
      this.searchTextError = true;
    } else {
      this.searchTextError = false;
    }
  }

}

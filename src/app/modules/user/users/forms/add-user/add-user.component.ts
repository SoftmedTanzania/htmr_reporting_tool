import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../../shared/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() userForm;
  @Input() users: User[];
  @Output() formSubmissionEvent = new EventEmitter();
  showNewPersonForm: boolean = false;
  @Input() roles: Array<any>;

  constructor() {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.formSubmissionEvent.emit(this.userForm);
  }

  showNewPersonFrom() {
    this.showNewPersonForm = true;
  }

  changeRole(roleCounter, itemcounter) {
    this.roles[roleCounter].roleItems[itemcounter].selected = !this.roles[roleCounter].roleItems[itemcounter].selected;
  }
}

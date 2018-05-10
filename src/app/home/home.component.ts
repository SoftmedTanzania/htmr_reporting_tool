import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/reducers';
import {Go} from '../store/actions/router.action';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})
export class HomeComponent implements OnInit {

  navigation = [];

  constructor(
    private store: Store<ApplicationState>,
    private  userService: UserService
  ) {
   this.navigation = userService.getNavigation();
  }

  ngOnInit() {
  }


  goToChangePass() {
    this.store.dispatch(new Go({path: ['/home', 'change_password']}));
  }

  goTo(path) {
    this.store.dispatch(new Go(path));
  }

  logout() {
    this.userService.removeLocalStorageNavigation();
    this.userService.deleteToken();
    this.userService.loggedIn = false;
    this.store.dispatch(new Go({path: ['/login']}));
  }

}

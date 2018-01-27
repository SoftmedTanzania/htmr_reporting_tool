import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/reducers';
import {Go} from '../store/actions/router.action';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginNotification = {isError: false, message: 'Login successful', attempted: false, loading: false};
  loginForm: FormGroup;
  customeUsernameNotifier: boolean = false;
  customePasswordNotifier: boolean = false;

  constructor(private store: Store<ApplicationState>, private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {

  }

  login(loginForm) {
    this.customeUsernameNotifier = false;
    this.customePasswordNotifier = false;
    const loginCredentials = loginForm.value;

    if (loginCredentials.username === '') {
      this.customeUsernameNotifier = true;
      return;
    } else if (loginCredentials.password === '') {
      this.customePasswordNotifier = true;
      return;
    }

    this.loginNotification.loading = true;
    this.userService.login(loginCredentials).subscribe((results) => {
      this.loginNotification.isError = false;
      this.loginNotification.message = 'Login successful';
      this.loginNotification.attempted = true;
      this.loginNotification.loading = false;
      this.userService.loggedIn = true;
      this.userService.setNavigation(results);
      console.log(results);
      setTimeout(() => {
        this.store.dispatch(new Go({path: ['/home', 'dashboard']}));
      }, 2000);

    }, (error) => {
      this.loginNotification.isError = true;
      this.loginNotification.message = 'Login failure, wrong username or password';
      this.loginNotification.attempted = true;
      this.loginNotification.loading = false;
      this.userService.loggedIn = false;
      this.store.dispatch(new Go({path: ['/login']}));
    });
  }
}

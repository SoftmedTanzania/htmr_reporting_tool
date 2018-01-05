import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store/reducers';
import {Go} from './store/actions/router.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor (private store: Store<ApplicationState>) { }

  logout() {

  }

}

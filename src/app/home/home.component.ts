import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/reducers';
import {Go} from '../store/actions/router.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.css'],
  animations: []
})
export class HomeComponent implements OnInit {


  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }


  goToChangePass() {
    this.store.dispatch(new Go({path: ['/home', 'change_password']}));
  }

  goTo(path) {
    this.store.dispatch(new Go(path));
  }

  logout() {
    this.store.dispatch(new Go({path: ['/login']}));
  }

}

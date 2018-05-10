import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store/reducers';
import {Go} from './store/actions/router.action';
import {UserService} from './shared/services/user.service';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  loading;
  constructor (private router: Router) { }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }

}

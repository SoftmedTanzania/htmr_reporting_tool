import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.userService.isAuthenticated().then(
      (authenticationState: boolean) => {
        if (authenticationState) {
          return true;
        } else {
          return false;
        }
      }
    );
  }
}

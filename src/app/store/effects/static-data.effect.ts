import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {DataService} from '../../shared/services/data.service';
import * as staticActions from '../actions/static-data.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class StaticDataEffect {
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {  }

  @Effect({ dispatch: false })
  loadGroups$ = this.actions$.ofType(staticActions.LOAD_USER_GROUPS).pipe(
    tap(() => {
      this.dataService.getUserGroups();
    })
  );

  @Effect({ dispatch: false })
  loadUsers$ = this.actions$.ofType(staticActions.LOAD_USER).pipe(
    tap(() => {
      this.dataService.getUser();
    })
  );
}

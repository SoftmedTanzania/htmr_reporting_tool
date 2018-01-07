import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClientService} from './http-client.service';

@Injectable()
export class TeamService {

  constructor(private http: HttpClientService) {
  }


  createTeam(team) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`team`, team)
        .subscribe((teamResponse: any) => {
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  updateTeam(team, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`team/` + uuid, team)
        .subscribe((teamResponse: any) => {
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteTeam(team) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`team/` + team.uuid)
        .subscribe((teamResponse: any) => {
            observer.next(teamResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }


  createTeamMember(teamMember) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`/team/teammember`, teamMember)
        .subscribe((teamMemberResponse: any) => {
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  updateTeamMember(teamMember, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`/team/teammember/` + uuid, teamMember)
        .subscribe((teamMemberResponse: any) => {
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteTeamMember(teamMember) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`/team/teammember/` + teamMember.uuid)
        .subscribe((teamMemberResponse: any) => {
            observer.next(teamMemberResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }


}

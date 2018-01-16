import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class UserService {
  loadingMessage: string = 'Loading Users';

  constructor(private http: HttpClientService) {
  }

  login(loginCredentials) {
    this.http.prepareToken(loginCredentials);
    return this.http.getOpenMRS('user?v=full&username=' + loginCredentials.username);
  }

  sessionCheck() {

  }

  listPersons() {
    return Observable.create(observer => {

      this.http.getOpenMRS(`person?v=full`)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  listRoles() {
    return Observable.create(observer => {

      this.http.getOpenMRS(`role?v=full`)
        .subscribe((personResponse: any) => {
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  createPerson(person) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`person`, person)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'person created successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'person creation  failed';
            observer.error('some error occur');
          });
    });
  }

  updatePerson(person, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`person/` + uuid, person)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deletePerson(person) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`person/` + person.uuid)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }


  listUsers(): Observable<User[]> {
    return Observable.create(observer => {

      this.http.getOpenMRS(`user?v=full`)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  createUser(user) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`user`, user)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  updateUser(user, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`user/` + uuid, user)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deleteUser(user) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`user/` + user.uuid + '?purge=true')
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

}

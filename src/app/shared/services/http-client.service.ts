import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare var window;
@Injectable()
export class HttpClientService {
  public DHISAPIURL = '../../../api/';
  // public DHISAPIURL = 'http://45.56.90.103:8080/dhis/api/';
  public OPENMRSURL = 'http://45.56.90.103:8080/openmrs/ws/rest/v1/';

  constructor(private http: HttpClient) {
  }

  prepareToken(credentials: { username, password }) {
    const username = credentials.username;
    const password = credentials.password;
    const token = btoa(username + ':' + password);

    if (typeof(Storage) !== undefined) {
      window.sessionStorage.setItem('web-token', token);
    } else {
      // TODO: execute block of codes if there is not local storage support
    }

    return token;
  }

  private _getToken() {
    const username = 'admin';
    const password = 'district';
    let webToken = null;
    if (typeof(Storage) !== undefined) {
      webToken = window.sessionStorage.getItem('web-token');
    } else {
      // TODO: execute block of codes if there is not local storage support
    }
    return webToken;
  }

  createDHISAuthorizationHeader() {
    const username = 'admin';
    const password = 'district';

    const token = btoa(username + ':' + password);
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }

  createOpenMRSAuthorizationHeader(token) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return 'Basic ' + token;
  }

  get(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get<any>(this.DHISAPIURL + url, {
      headers: headers
    });
  }

  getOpenMRS(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this._getToken());
    return this.http.get(this.OPENMRSURL + url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }


  getDHIS(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get(this.DHISAPIURL + url, {
      headers: headers
    });
  }

  postOpenMRS(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this._getToken());
    return this.http.post(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


  postDHIS(url, data, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.post(this.DHISAPIURL + url, data, {
      headers: headers
    });
  }

  deleteDHIS(url, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.delete(this.DHISAPIURL + url, {
      headers: headers
    });
  }


  putOpenMRS(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this._getToken());
    return this.http.put<any>(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  deleteOpenMRS(url, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this._getToken());
    return this.http.delete(this.OPENMRSURL + url, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


  // get_from_base(url) {
  //   const headers = new HttpHeaders();
  //   this.createAuthorizationHeader(headers);
  //   return this.http.get<any>( url, {
  //     headers: headers
  //   });
  // }

  // post(url, data, options?) {
  //   const headers = new HttpHeaders();
  //   this.createAuthorizationHeader(headers, options);
  //   return this.http.post<any>(this.APIURL + url, data, {
  //     headers: headers
  //   });
  // }
  // put(url, data, options?) {
  //   const headers = new HttpHeaders();
  //   this.createAuthorizationHeader(headers, options);
  //   return this.http.put<any>(this.APIURL + url, data, {
  //     headers: headers
  //   });
  // }
  //
  // delete(url, options?) {
  //   const headers = new HttpHeaders();
  //   this.createAuthorizationHeader(headers, options);
  //   return this.http.delete(this.APIURL + url, {
  //     headers: headers
  //   });
  // }

}

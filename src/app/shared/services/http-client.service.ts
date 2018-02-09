import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare var window;
@Injectable()
export class HttpClientService {
  // public DHISAPIURL = '../../../api/';
  public DHISAPIURL = 'http://139.162.151.34:8080/dhis/api/';
  public OPENSRPAPIURL = 'http://139.162.151.34:8080/opensrp/';
  public OPENMRSURL = 'http://139.162.151.34:8080/openmrs/ws/rest/v1/';

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

  getToken() {
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

  deleteToken() {
    window.sessionStorage.removeItem('web-token');
  }

  createDHISAuthorizationHeader() {
    const username = 'admin';
    const password = 'district';

    const token = btoa(username + ':' + password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });

    return headers;
  }

  createOpenMRSAuthorizationHeader(token) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return 'Basic ' + token;
  }


  createOPENSRPAuthorizationHeader() {

    const username = 'facility';
    const password = 'Facilityuser2017.';

    const token = btoa(username + ':' + password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });

    return 'Basic ' + token;
  }

  get(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get<any>(this.DHISAPIURL + url, {
      headers: headers
    });
  }

  getOpenMRS(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
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
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
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

  putDHIS(url, data, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.put(this.DHISAPIURL + url, data, {
      headers: headers
    });
  }

  postOpenSRP(url, data, options?) {
    const headers: string = this.createOPENSRPAuthorizationHeader();
    return this.http.post(this.OPENSRPAPIURL + url, data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }


  getOpenSRP(url) {
    const headers: string = this.createOPENSRPAuthorizationHeader();
    return this.http.get<any>(this.OPENSRPAPIURL + url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }

  deleteOpenSRP(url, id) {
    const headers: string = this.createOPENSRPAuthorizationHeader();
    return this.http.delete<any>(this.OPENSRPAPIURL + url + '/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }

  updateOpenSRP(url, data, id) {
    const headers: string = this.createOPENSRPAuthorizationHeader();
    return this.http.put<any>(this.OPENSRPAPIURL + url + '/' + id, data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }


  deleteDHIS(url, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.delete(this.DHISAPIURL + url, {
      headers: headers
    });
  }


  putOpenMRS(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.post<any>(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  deleteOpenMRS(url, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.delete(this.OPENMRSURL + url, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


}

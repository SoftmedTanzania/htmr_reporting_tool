import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientService {
  public APIURL = '../../../api/';
  constructor(private http: HttpClient) { }


  createDHISAuthorizationHeader() {
    const username = 'admin';
    const password = 'district';

    const token = btoa(username + ':' + password);

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }

  createOpenMRSAuthorizationHeader() {
    const username = 'admin';
    const password = 'Admin123';

    const token = btoa(username + ':' + password);

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }

  get(url) {
    const headers = new HttpHeaders();
    return this.http.get<any>(this.APIURL + url);
  }

  getOpenMRS(url) {
    const headers: HttpHeaders = this.createOpenMRSAuthorizationHeader();
    return this.http.get(this.APIURL + url, {
      headers: headers
    });
  }


  getDHIS(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get(this.APIURL + url, {
      headers: headers
    });
  }

  postOpenMRS(url, data, options?) {
    const headers: HttpHeaders = this.createOpenMRSAuthorizationHeader();
    return this.http.post(this.APIURL + url, data, {
      headers: headers
    });
  }


  postDHIS(url, data, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.post(this.APIURL + url, data, {
      headers: headers
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

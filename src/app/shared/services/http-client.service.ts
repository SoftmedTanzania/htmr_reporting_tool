import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientService {
  public DHISAPIURL = '../../../api/';
  public OPENMRSURL = 'http://45.56.90.103:8080/openmrs/ws/rest/v1/';

  constructor(private http: HttpClient) {
  }


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

    return 'Basic ' + token;
  }

  get(url) {
    const headers = new HttpHeaders();
    return this.http.get<any>(this.DHISAPIURL + url);
  }

  getOpenMRS(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader();
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
    const headers: string = this.createOpenMRSAuthorizationHeader();
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
    const headers: string = this.createOpenMRSAuthorizationHeader();
    return this.http.put<any>(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  deleteOpenMRS(url, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader();
    return this.http.delete(this.OPENMRSURL + url,  {
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

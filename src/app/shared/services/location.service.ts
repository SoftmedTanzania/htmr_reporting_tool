import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Location} from '../models/location';

@Injectable()
export class LocationService {

  locataion: Location[];
  constructor(private http: HttpClientService) { }

  // get all data element group
  loadLocations() {
    return this.http.getOpenMRS(`location`);
  }


}

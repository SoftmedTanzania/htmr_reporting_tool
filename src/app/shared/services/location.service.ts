import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Location} from '../models/location';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocationService {

  locations: Location[];
  loadingMessage = 'loading locations';
  constructor(private http: HttpClientService) {
  }

  // get all data element group
  loadLocations(): Observable<Array<Location>> {

    return Observable.create(observer => {

      this.http.getOpenMRS(`location`)
        .subscribe((locationResponse: any) => {

            this.locations = locationResponse.results.map((location) => {
              return {
                uuid: location.uuid,
                display: location.display,
                links: location.links
              };
            });
            this.loadingMessage = 'loaded successfully';
            observer.next(this.locations);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });

    });

  }


}

import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../shared/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.loadLocations().subscribe((success) => {
      console.log(success);
    }, (error) => {
      console.log(error);
    });
  }

}

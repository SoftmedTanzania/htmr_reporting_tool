import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../shared/services/location.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations: any = [];
  loading = false;
  loadingMessage = '';

  locationForm: FormGroup;

  constructor(private locationService: LocationService, private formBuilder: FormBuilder) {
    this.locationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: '',
        parentLocation: '',
        tagOne: '',
        tagTwo: ''
      });
  }

  ngOnInit() {
    this.loading = true;
    this.loadingMessage = this.locationService.loadingMessage;
    this.locationService.loadLocations().subscribe((locations) => {
      this.locations = locations;
      this.loading = false;
      this.loadingMessage = this.locationService.loadingMessage;
    }, (error) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.loading = true;
    });
  }

  submit(){

  }

}

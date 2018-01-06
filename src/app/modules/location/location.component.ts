import {Component, ElementRef, OnInit} from '@angular/core';
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
  updating = false;
  deleting = false;
  updatingIsError = false;
  deletingIsError = false;
  loadingIsError = false;
  notify = false;
  loadingMessage = '';
  formReference: any;
  tags = {
    tagOne: '15d11935-e183-43da-9c42-d0ced1efd872',
    tagTwo: '8d4626ca-7abd-42ad-be48-56767bbcf272'
  }

  locationForm: FormGroup;

  constructor(private locationService: LocationService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {

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
    this.formReference = this.elementRef.nativeElement.querySelector('#locationFormButton');
    this.loading = true;
    this.loadingIsError = false;
    this.notify = false;
    this.loadingMessage = this.locationService.loadingMessage;
    this.locationService.loadLocations().subscribe((locations) => {
      this.locations = locations;
      this.loading = false;
      this.notify = true;
      this.loadingIsError = false;
      this.loadingMessage = this.locationService.loadingMessage;
    }, (error) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.loading = true;
      this.notify = true;
      this.loadingIsError = true;
    });
  }

  /**
   * Trigger form submission
   * */
  submit() {
    this.formReference.click();
  }

  /**
   * Listening to form submission Event
   * */
  onSubmit() {
    const dataObject = {
      name: '',
      display: '',
      parentLocation: '',
      description: '',
      tags: []

    };

    if (this.locationForm.valid && this.locationForm.touched) {
      this.updating = true;
      dataObject.name = this.locationForm.value['name'];
      dataObject.display = this.locationForm.value['name'];
      dataObject.parentLocation = this.locationForm.value['parentLocation'];
      dataObject.description = this.locationForm.value['description'];

      !this.locationForm.value['tagOne'] ? dataObject.tags.push({uuid: this.tags['tagTwo']}) :
        !this.locationForm.value['tagTwo'] ? dataObject.tags.push({uuid: this.tags['tagOne']}) :
          dataObject.tags = [{uuid: this.tags['tagOne']}, {uuid: this.tags['tagTwo']}];

      this.updatingIsError = false;
      this.notify = false;
      this.locationService.createLocation(dataObject).subscribe((success) => {
        this.updatingIsError = false;
        this.updating = false;
        this.notify = true;
        this.loadingMessage = this.locationService.loadingMessage;
        this.resetForm();
        this.locationService.loadLocations().subscribe((locations) => {
          this.locations = locations;
        });
      }, (error) => {
        this.updatingIsError = true;
        this.notify = true;
        this.loadingMessage = this.locationService.loadingMessage;
      });
    }

  }

  /**
   * Delete selected locataion
   * */
  deleteLocation(location) {
    this.deleting = true;
    this.notify = false;
    this.loadingMessage = 'Deleting ' + location.display + ' location';
    this.locationService.deleteLocation(location).subscribe((success) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.deleting = false;
      this.deletingIsError = false;
      this.notify = true;
      this.locationService.loadLocations().subscribe((locations) => {
        this.locations = locations;
      });
    }, (error) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.deleting = false;
      this.notify = true;
      this.deletingIsError = true;
    });
  }

  /**
   * Close and reset the form
   * */
  closeForm() {
    this.notify = false;
    this.resetForm();
  }

  resetForm() {
    this.locationForm.reset();
  }

}

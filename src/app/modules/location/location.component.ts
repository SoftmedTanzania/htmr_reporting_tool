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
  showEditForm = false;
  showAddForm = false;
  locationForm: FormGroup;

  constructor(private locationService: LocationService,
              private formBuilder: FormBuilder,
              private elementRef: ElementRef) {

    this.locationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: '',
        parentLocation: '',
        hfrCode: '',
        tagOne: '',
        tagTwo: ''
      });
  }

  ngOnInit() {

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
      this.clearVariables();
    }, (error) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.loading = true;
      this.notify = true;
      this.loadingIsError = true;
      this.clearVariables();
    });
  }

  /**
   * Trigger form submission
   * */
  submit() {
    this.formReference = this.elementRef.nativeElement.querySelector('#locationFormButton');
    this.formReference.click();
  }

  /**
   * Listening to form submission Event
   * */
  onSubmit($event) {
    const locationForm = $event;
    const dataObject = {
      name: '',
      display: '',
      parentLocation: '',
      description: '',
      tags: []

    };

    if (locationForm.valid && locationForm.touched) {
      this.updating = true;
      dataObject.name = locationForm.value['name'];
      dataObject.display = locationForm.value['name'];
      dataObject.parentLocation = locationForm.value['parentLocation'];
      dataObject.description = locationForm.value['description'];

      !locationForm.value['tagOne'] ? dataObject.tags.push({uuid: this.tags['tagTwo']}) :
        !locationForm.value['tagTwo'] ? dataObject.tags.push({uuid: this.tags['tagOne']}) :
          dataObject.tags = [{uuid: this.tags['tagOne']}, {uuid: this.tags['tagTwo']}];

      this.updatingIsError = false;
      this.notify = false;
      this.locationService.createLocation(dataObject).subscribe((success) => {
        this.updatingIsError = false;
        this.updating = false;
        this.notify = true;
        this.loadingMessage = this.locationService.loadingMessage;
        this.resetForm();
        this.clearVariables();
        this.locationService.loadLocations().subscribe((locations) => {
          this.locations = locations;
        });
        this.locationService.sendHRFDetails(
          {
            hfrCode: locationForm.value['hfrCode'],
            openmrsUIID: success.uuid ? success.uuid : '',
          }
        ).subscribe((openSRPSuccess) => {
          console.log(openSRPSuccess);
        });

      }, (error) => {
        this.updatingIsError = true;
        this.notify = true;
        this.loadingMessage = this.locationService.loadingMessage;
        this.clearVariables();
      });
    }

  }

  /**
   * Draw location Edit form
   * */

  editLocation(location) {
    this.showEditForm = true;
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
      this.clearVariables();
      this.locationService.loadLocations().subscribe((locations) => {
        this.locations = locations;
      });

    }, (error) => {
      this.loadingMessage = this.locationService.loadingMessage;
      this.deleting = false;
      this.notify = true;
      this.deletingIsError = true;
      this.clearVariables();
    });
  }


  renderTags(tags) {
    let tagString = '';
    tags.forEach((tag) => {
      tagString += ',' + tag.display;
    });
    tagString = tagString.length > 0 ? tagString.substr(1, tagString.length) : '';
    return tagString;
  }

  /**
   * Close and reset the form
   * */
  closeForm() {
    this.notify = false;
    this.showAddForm = false;
    this.showEditForm = false;
    this.resetForm();
  }


  resetForm() {
    this.locationForm.reset();
  }

  clearVariables() {

    setTimeout(() => {
      this.updatingIsError = false;
      this.updating = false;
      this.notify = false;
    }, 3000);

  }

  showAddFormTemplate() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showEditFormTemplate(editedLocation) {
    this.showEditForm = true;
    this.showAddForm = false;
    this.locationForm.value['name'] = editedLocation['name'];
    this.locationForm.value['display'] = editedLocation['display'];
    this.locationForm.value['parentLocation'] = editedLocation['parentLocation'];
    this.locationForm.value['description'] = editedLocation['description'];

  }
}

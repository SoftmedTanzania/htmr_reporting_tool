import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-cu-manager',
  templateUrl: './form-cu-manager.component.html',
  styleUrls: ['./form-cu-manager.component.css']
})
export class FormCuManagerComponent implements OnInit {
  @Input() formsList: any = [];
  @Input() availableDataElements: any = [];
  @Input() selectedDataElements: any = [];
  @Input() availableCategories: any = [];
  @Input() selectedCategories: any = [];
  @Output() newFormCreate = new EventEmitter;
  @Input() orgunit: any;
  orgunit_tree_config: any = {
    show_search : true,
    search_text : 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Locations...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select Location'
  };


  formSections: Array<any> = [];
  sectionName: string;
  formName: string;
  periodType: string;
  showFormSectionForm: boolean = false;
  showFormFacilitySectionForm: boolean = false;
  nameNotGiven: boolean = false;


  constructor() {
  }

  ngOnInit() {
  }


  saveFormTemplate()
  {
    const formTemplate = {
      name: this.formName,
      id: this.UID(),
      datasetId: '',
      periodType: this.periodType,
      sections: this.formSections
    };

    this.newFormCreate.emit(formTemplate);
  }
  onSelectedDataChanged(event, type) {

    if (type === 'dataElements') {
      this.selectedDataElements = event;
    }
    if (type === 'categories') {
      this.selectedCategories = event;
    }
  }

  addFormSection() {
    if (this.sectionName.length === 0) {
      return false;
    }

    if (this.periodType.length === 0) {
      return false;
    }

    const formSection = {
      categories: this.selectedCategories,
      id: this.UID(),
      name: this.sectionName,
      items: this.selectedDataElements,
    }
    this.formSections = [...this.formSections, formSection];
    this.selectedCategories = [];
    this.selectedDataElements = [];
    this.sectionName = '';
    const clonedAvailableDataElements = _.clone(this.availableDataElements);
    this.availableDataElements = [];
    this.availableDataElements = clonedAvailableDataElements;


    const clonedAvailableCategories = _.clone(this.availableCategories);
    this.availableCategories = [];
    this.availableCategories = clonedAvailableCategories;

  }

  doneCreatingSection() {
    this.showFormSectionForm = false;
  }


  doneAssigningOrganisationUnit() {
    this.showFormFacilitySectionForm = false;
  }

  deleteSection(formSection) {
    this.formSections = this.formSections.filter((section) => {
      return formSection.id !== section.id;
    });
  }


  UID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}

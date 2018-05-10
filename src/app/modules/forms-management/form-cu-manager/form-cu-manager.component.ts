import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
    show_search: true,
    search_text: 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Locations...',
    multiple: false,
    multiple_key: 'none', // can be control or shift
    placeholder: 'Select Location'
  };

  formInstance: {
    name: string,
    id: string,
    datasetId: string,
    periodType: string,
    sections: Array<any>
  };
  currentFormSection: {
    categories: Array<any>,
    id: string,
    name: string,
    items: Array<any>,
    categoryItems: Array<any>
  } = {
    categories: [],
    id: '',
    name: '',
    items: [],
    categoryItems: []
  };


  selectedOrganisationUnit: any = [];
  newDataItemId = null;

  formSections: Array<any> = [];
  displaySection: any;
  sectionName: string;
  formName: string;
  periodType: string;
  showFormSectionForm: boolean = false;
  showFormFacilitySectionForm: boolean = false;
  nameNotGiven: boolean = false;

  catchedCategories = [];
  catchedDataElements = [];
  isDefaultRowExist: boolean = false;
  disbleFields: boolean = true;
  isPeriodType: boolean = false;
  isFormname: boolean = false;



  constructor() {
  }

  ngOnInit() {
  }


  saveFormTemplate() {
    const formTemplate = {
      name: this.formName,
      id: this.UID(),
      datasetId: '',
      periodType: this.periodType,
      sections: this.formSections,
      selectedOrgUnits: this.selectedOrganisationUnit
    };

    if ( this.formSections.length > 0 && this.selectedOrganisationUnit.length >0 )
    {
      this.newFormCreate.emit(formTemplate);
    } else {

    }


  }

  selectPeriodType($event) {
    this.isPeriodType = true;
    if ( this.isFormname && this.isPeriodType )
    {
      this.disbleFields = false;
    }
  }

  selectFormName($event) {

    this.isFormname = true;

    if ( this.isFormname && this.isPeriodType )
    {
      this.disbleFields = false;
    }
  }

  addDataElements() {
    const itemIndex = _.findIndex(this.currentFormSection.items, (itemElement) => {
      return itemElement.id === this.newDataItemId;
    });

    this.catchedDataElements.map((item: any) => {
      if (this.currentFormSection.items[itemIndex]) {
        this.currentFormSection.items[itemIndex].dataElements.push(item.id);
        this.currentFormSection.items[itemIndex].name = item.name;
      } else {
        this.isDefaultRowExist = false;
        // Throw notification error to create new row
      }

    });

  }

  selectDataElements(item) {
    this.catchedDataElements = [...this.catchedDataElements, item];

    // const selectedDataElementIndex = _.findIndex(this.availableDataElements, (dataElement: any, index) => {
    //   if (dataElement.id === item.id) {
    //     return index;
    //   }
    // });

    this.catchedDataElements = this.catchedDataElements.map((dataElement) => {
      if (dataElement !== item.id) {
        return dataElement;
      }
    });

    const itemIndex = _.findIndex(this.currentFormSection.items, (itemElement) => {
      return itemElement.id === this.newDataItemId;
    });

    if (this.currentFormSection.items[itemIndex]) {
      this.currentFormSection.items[itemIndex].dataElements.push(item.id);
      this.currentFormSection.items[itemIndex].name = item.name;
    } else {
      console.log('NKOMANO');
      this.isDefaultRowExist = false;
      // Throw notification error to create new row
    }


  }

  selectCategory(item) {
    const categoryId = _.findIndex(this.catchedCategories, (category) => {
      return category.id === item.id;
    });

    if (categoryId > -1) {
      this.catchedCategories.splice(categoryId, 1);
    } else {
      this.catchedCategories = [...this.catchedCategories, item];
    }
    this.currentFormSection.categories = this.catchedCategories.map((row: any) => {
      return row.id;
    });

  }

  isSelectedItem(item, catchedItems) {
    let index;
    catchedItems.forEach((cat, catIndex) => {
      if (cat.id === item.id) {
        index = catIndex;
      }
    });
    return index ? true : false;
  }


  getColSpan(n, categories) {
    if (categories.length === n) {
      return 1;
    } else if (categories.length === (n + 1)) {
      return categories[n].items.length;
    } else if (categories.length === (n + 2)) {
      return categories[n].items.length * categories[n + 1].items.length;
    } else {
      return 1;
    }
  }

  createTableRow() {
    this.newDataItemId = this.UID();

    this.currentFormSection.name = this.sectionName;
    this.currentFormSection.items = [
      ...this.currentFormSection.items,
      {
        id: this.newDataItemId,
        name: '',
        dataElements: []
      }
    ];
    this.isDefaultRowExist = true;
  }

  addFormSection() {
    if (!this.sectionName) {
      return false;
    }

    if (!this.periodType) {
      return false;
    }
    this.currentFormSection.id = this.UID();

    this.formSections = [...this.formSections, this.currentFormSection];


  }

  doneCreatingSection() {
    this.showFormSectionForm = false;
  }

  onOrgUnitChangeAction(event) {
    this.selectedOrganisationUnit = event.items;
  }


  doneAssigningOrganisationUnit() {
    this.showFormFacilitySectionForm = false;
  }

  updateDataItemName(event, id) {
    const rowId = _.findIndex(this.currentFormSection.items, (itemElement) => {
      return itemElement.id === id;
    });
    this.currentFormSection.items[rowId].name = event.target.value;
  }

  deleteSection(formSection) {
    this.formSections = this.formSections.filter((section) => {
      return formSection.id !== section.id;
    });
  }

  deleteItem(element, row) {
    const rowId = _.findIndex(this.currentFormSection.items, (itemElement) => {
      return itemElement.id === row.id;
    });

    this.currentFormSection.items[rowId].dataElements.splice(_.findIndex(this.currentFormSection.items[rowId].dataElements, (itemElement) => {
      return itemElement === element;
    }), 1);

  }

  editElement(item) {
    this.newDataItemId = item.id;
  }

  deleteElement(row) {
    this.currentFormSection.items.splice(
      _.findIndex(this.currentFormSection.items, (itemElement) => {
        return itemElement.id === row.id;
      }), 1
    );

  }

  removeCategory(category) {
    this.currentFormSection.categories.splice(
      _.findIndex(this.currentFormSection.categories, (categoryItem) => {
        return categoryItem === category.id;
      })
      , 1
    );
    this.catchedCategories.splice(
      _.findIndex(this.catchedCategories, (categoryItem) => {
        return categoryItem.id === category.id;
      })
      , 1
    );
  }

  public sectionDisplay(section): any {
    section.categoryItems = section.categories.map((cat) => {
      return _.filter(this.availableCategories, (category) => {
        return category.id === cat ? category : null;
      })[0];
    });
    return section;
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

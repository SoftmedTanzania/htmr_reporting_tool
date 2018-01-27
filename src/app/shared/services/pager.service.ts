import {Injectable} from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class PagerService {

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  filterCollection(collection, searchText, fieldName) {
    const newCollection = [];
    if (searchText !== undefined) {
      if (fieldName !== undefined) {
        collection.forEach((valueItem, valueItemIndex) => {
          if (this.getItemByFieldName(valueItem, fieldName).toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            newCollection.push(valueItem);
          }
        });
        return newCollection;
      }
    }

    return collection;
  }

  getItemByFieldName(item, fieldName): any {
    if (fieldName.indexOf('.') > 0) {
      const fields = fieldName.split('.');
      return item[fields[0]][fields[1]];
      // TODO: Improve this hardcodig for fields , use automated loops instead
    } else {
      return item[fieldName];
    }

  }
}

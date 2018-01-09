import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() paginationMapFavourites;
  @Input() pageSize;
  @Input() currentPage;
  @Output() returnCurrentPage: EventEmitter<any> = new EventEmitter();
  private pages: Array<any> = [];
  pagesNumbers: Array<any> = [];
  numberOfPages = 0;
  pageStarter: any = 0;

  constructor() {
    if (!this.currentPage) this.currentPage = 0;
  }

  ngOnChanges() {
    const totalPages = this.paginationMapFavourites.length / this.pageSize;
    this.pages = this._preparePages(totalPages, this.pageSize, this.paginationMapFavourites);
    this.numberOfPages = this.pages.length;
    this._getCurrentPage(this.currentPage);
    this.pagesNumbers = this._preparePageNumbersArray(this.numberOfPages, this.currentPage);
  }

  private _getCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
    this.returnCurrentPage.emit(this.pages[pageNumber]);
  }

  getNextPage() {

    if (this.currentPage < this.numberOfPages - 1) {
      this.currentPage++;
      this._getCurrentPage(this.currentPage);
      this.pagesNumbers = this._preparePageNumbersArray(this.numberOfPages, this.currentPage);
    }
  }

  getPrevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this._getCurrentPage(this.currentPage);
      this.pagesNumbers = this._preparePageNumbersArray(this.numberOfPages, this.currentPage);
    }
  }

  setCurrentPage(pageNumber) {
    this._getCurrentPage(pageNumber);
    this.pagesNumbers = this._preparePageNumbersArray(this.numberOfPages, pageNumber);
  }


  private _preparePages(totalPages, pageSize, contents): Array<any> {
    let pages = [];
    let page = [];
    let itemCounter = 0;
    contents.forEach((pageItem, pageItemIndex) => {
      itemCounter++;
      if (itemCounter === pageSize) {
        itemCounter = 0;
        page.push(pageItem);
        pages.push(page);
        page = [];
      } else {
        page.push(pageItem);
      }
    })
    return pages;
  }

  private _preparePageNumbersArray(numberOfPages: number, currentPage: number): Array<any> {
    const pageNumbersArray: Array<any> = [];
    let pageChecker = 0;

    if (currentPage % 4 === 0) {

      this.pageStarter = currentPage > 3 ? currentPage - 3 : currentPage;
    }

    for (let page = this.pageStarter; page < numberOfPages; page++) {
      if (pageChecker < 4) {
        pageNumbersArray.push(page);
      } else if (pageChecker === 4) {
        pageNumbersArray.push('...');
        pageChecker = 0;
      } else if (pageChecker >= numberOfPages - 2) {
        pageNumbersArray.push(page);
      }

      pageChecker = page;
    }
    return pageNumbersArray;
  }

}

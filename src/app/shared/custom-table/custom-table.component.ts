import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from '../services/http-client.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() url = 'dataElements.json';
  dataArray: any[] = [];
  currentPage: number = 1;
  pageSize: number = 25;
  totalCount: number = 0;
  pagination: any[] = [];
  sortOrder: string = 'asc';
  queryField: FormControl = new FormControl();
  constructor(
    private httpService: HttpClientService
  ) { }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe( result => console.log(result));
  }

  getData(url, page, pageSize, orderBy = null, orderLevel = 'asc') {
    this.currentPage = page;
    this.pageSize = pageSize;
    const server = orderBy
      ? url + '?order=' + orderBy + ':' + orderLevel + '&page=' + page + '&pageSize=' + pageSize
      : url + '?page=' + page + '&pageSize=' + pageSize;
    this.httpService.getDHIS(server)
      .subscribe((d: any) => {
        this.totalCount = d.pager.total;
        this.dataArray = d.dataElements;
        this.preparePages();
      });
  }

  searchField(value) {
    console.log(value)
  }

  sortBy(column) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.getData(this.url, 1, this.pageSize, column, this.sortOrder);
  }

  goPrevious() {
    this.currentPage  = this.currentPage > 1 ? 1 : this.currentPage - 1;
    this.getData(this.url, this.currentPage, this.pageSize);
  }
  goNext() {
    const pages = this.totalCount / this.pageSize;
    this.currentPage  = this.currentPage > pages ? this.currentPage : this.currentPage + 1;
    this.getData(this.url, this.currentPage, this.pageSize);
  }

  preparePages() {
    const pages = this.totalCount / this.pageSize;
    this.pagination = [];
    for ( let i = 0; i < pages; i++ ) {
      this.pagination.push(i + 1);
    }
  }

}

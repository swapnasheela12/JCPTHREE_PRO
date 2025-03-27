import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { GridApi } from '@ag-grid-community/core';
import { PagerService } from './../../../../_services/pager/pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [PagerService]
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() pageSize = 0;
  @Input() gridApi: GridApi;
  @Input() noOfPages = 0;
  @Input() rowCount = 0;
  @Input() paginationArray = [];
  @Input() showParameter;
  @Input() showParameterValue;
  private paginationPages = {};
  private pagiunationPageSize;
  selectedRowsValue: number = 10;
  disabled: Boolean;
  lastIndex: number = this.selectedRowsValue;
  firstIndex: number = 1;
  parameter;
  parameter1;

  paginationValues = [10, 20, 30, 40];
  parameterValue: any;

  get currentPage(): number {
    return this.gridApi ? this.gridApi.paginationGetCurrentPage() + 1 : 1;
  }

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.paginationValues = this.paginationArray;
    this.selectedRowsValue = this.paginationValues[0];
    this.parameter = this.showParameter;
    this.parameterValue = this.showParameterValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'noOfPages') {
        this.paginationPages = this.noOfPages ? this.pagerService.getPager(this.noOfPages, 1) : {};
      }
    }
  }

  selectedRows() {
    this.lastIndex = this.selectedRowsValue * (this.currentPage);
    this.firstIndex = (this.selectedRowsValue * (this.currentPage)) - (this.selectedRowsValue - 1);
    this.gridApi.paginationSetPageSize(this.selectedRowsValue);
    if (this.rowCount == this.pagerService.getPager(this.rowCount, this.currentPage, this.selectedRowsValue).endIndex) {
      this.lastIndex = this.rowCount;
    }
  }

  goToPage(index: number) {
    this.gridApi.paginationGoToPage(index);
    this.paginationPages = this.pagerService.getPager(this.rowCount, index + 1, this.selectedRowsValue);
  }

  goToNext() {
    this.firstIndex = (this.selectedRowsValue * (this.currentPage + 1)) - (this.selectedRowsValue - 1);
    this.lastIndex = this.selectedRowsValue * (this.currentPage + 1);
    this.gridApi.paginationGoToNextPage();
    if (this.rowCount == this.pagerService.getPager(this.rowCount, this.currentPage, this.selectedRowsValue).endIndex) {
      this.lastIndex = this.rowCount;
    }
  }

  goToPrevious() {
    this.firstIndex = (this.selectedRowsValue * (this.currentPage - 1)) - (this.selectedRowsValue - 1);
    this.lastIndex = this.selectedRowsValue * (this.currentPage - 1);
    this.gridApi.paginationGoToPreviousPage();
    if (this.rowCount == this.pagerService.getPager(this.rowCount, this.currentPage, this.selectedRowsValue).endIndex) {
      this.lastIndex = this.rowCount;
    }
  }

  getpaginationPageSize() {
    this.gridApi.paginationGetRowCount();
  }
}
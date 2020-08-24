import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-view-summary',
    templateUrl: './view-summary.component.html',
    styleUrls: ['./view-summary.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ViewSummaryComponent implements OnInit {
    secondaryKpi: string = "Traffic";
    time: string = "time";
    cellList: string = "Custom Cell List";
    legendsList = [
        { class: 'green', name: 'Improvement' },
        { class: 'red', name: 'Degradation' },
        { class: 'blue', name: 'No Impact' },
    ]
    dataList = [
        { name: 'Overall', value: '1,00,00' },
        { name: '850', value: '15,000' },
        { name: '1800', value: '35,000' },
        { name: '2300-C1', value: '20,000' },
        { name: '2300-C2', value: '30,000' },
    ]
    public gridViewSummaryGridOptions: GridOptions;
    public gridViewSummaryColumnDefs: any[];
    public gridViewSummaryRowData: any;
    public url: string = "assets/data/modules/performance_management/my-performance-report/view-summary.json";
    VIEWSUMMARYDEFS = [
        {
            headerName: "KPI",
            field: "KPI",
            pinned: 'left',
            cellClass: "border-right",
            suppressMenu: true,
            width: 80
        }, {
            headerName: "Overall All",
            headerClass: "text-align-group-header",
            children: [{
                headerName: "Pre",
                field: "Pre",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "Post",
                field: "Post",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "% Change",
                field: "Change",
                width: 110,
                cellRenderer: function () {
                    const data = Math.round(Math.random() * 100);
                    if (data > 30) {
                        return '<div class="green-text">' + data + '</div>'
                    } else {
                        return '<div class="red-text">' + data + '</div>'
                    }

                },
                suppressMenu: true,
                cellClass: "text-center",
                headerClass: 'childHeader',
            }, {
                headerName: "% green",

                width: 100,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="green box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% red",

                width: 100,
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="red box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% blue",

                width: 100,
                cellClass: "border-right",
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="blue box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }]
        }, {
            headerName: "2300-C1",
            headerClass: "text-align-group-header",
            children: [{
                headerName: "Pre",
                field: "Pre",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "Post",
                field: "Post",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "% Change",
                field: "Change",
                width: 110,
                cellRenderer: function () {
                    const data = Math.round(Math.random() * 100);
                    if (data > 30) {
                        return '<div class="green-text">' + data + '</div>'
                    } else {
                        return '<div class="red-text">' + data + '</div>'
                    }
                },
                suppressMenu: true,
                cellClass: "text-center",
                headerClass: 'childHeader',
            }, {
                headerName: "% green",

                width: 100,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="green box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% red",

                width: 100,
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="red box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% blue",

                width: 100,
                cellClass: "border-right",
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="blue box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }]
        },
        {
            headerName: "2300-C2",
            headerClass: "text-align-group-header",
            children: [{
                headerName: "Pre",
                field: "Pre",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "Post",
                field: "Post",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "% Change",
                field: "Change",
                width: 110,
                cellRenderer: function () {
                    const data = Math.round(Math.random() * 100);
                    if (data > 30) {
                        return '<div class="green-text">' + data + '</div>'
                    } else {
                        return '<div class="red-text">' + data + '</div>'
                    }
                },
                suppressMenu: true,
                cellClass: "text-center",
                headerClass: 'childHeader',
            }, {
                headerName: "% green",

                width: 100,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="green box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% red",

                width: 100,
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="red box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% blue",

                width: 100,
                cellClass: "border-right",
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="blue box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }]
        },
        {
            headerName: "1800",
            headerClass: "text-align-group-header",
            children: [{
                headerName: "Pre",
                field: "Pre",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "Post",
                field: "Post",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "% Change",
                field: "Change",
                width: 110,
                cellRenderer: function () {
                    const data = Math.round(Math.random() * 100);
                    if (data > 30) {
                        return '<div class="green-text">' + data + '</div>'
                    } else {
                        return '<div class="red-text">' + data + '</div>'
                    }
                },
                suppressMenu: true,
                cellClass: "text-center",
                headerClass: 'childHeader',
            }, {
                headerName: "% green",

                width: 100,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="green box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% red",

                width: 100,
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="red box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% blue",

                width: 100,
                cellClass: "border-right",
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="blue box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }]
        }, {
            headerName: "850",
            headerClass: "text-align-group-header",
            children: [{
                headerName: "Pre",
                field: "Pre",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "Post",
                field: "Post",
                width: 80,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerClass: 'childHeader'
            }, {
                headerName: "% Change",
                field: "Change",
                width: 110,
                cellRenderer: function () {
                    const data = Math.round(Math.random() * 100);
                    if (data > 30) {
                        return '<div class="green-text">' + data + '</div>'
                    } else {
                        return '<div class="red-text">' + data + '</div>'
                    }
                },
                suppressMenu: true,
                cellClass: "text-center",
                headerClass: 'childHeader',
            }, {
                headerName: "% green",

                width: 100,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                suppressMenu: true,
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="green box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% red",

                width: 100,
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="red box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }, {
                headerName: "% blue",

                width: 100,
                cellClass: "border-right",
                suppressMenu: true,
                cellRenderer: function () {
                    return '<div>' + Math.round(Math.random() * 100) + '</div>'
                },
                headerComponentParams: {
                    template:
                        '<div class="ag-cell-label-container" role="presentation">' +
                        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
                        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
                        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
                        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
                        '     <div class="percentile"> %' +
                        '<div class="blue box-design"></div>' +
                        '</div>' +
                        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                        '  </div>' +
                        '</div>'
                },
            }]
        }
    ];
    constructor(
        private http: HttpClient
    ) {
        this.gridViewSummaryGridOptions = <GridOptions>{};
    }

    ngOnInit(): void {
        this.createColumnDefs();
        this.getViewSummaryData();
    }

    public createColumnDefs() {
        this.gridViewSummaryColumnDefs = this.VIEWSUMMARYDEFS;
    }
    public getViewSummaryData() {
        this.http.get(this.url)
            .subscribe(data => {
                this.gridViewSummaryRowData = data;
            });
    }
}

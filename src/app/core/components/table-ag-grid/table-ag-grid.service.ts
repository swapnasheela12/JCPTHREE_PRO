import { Injectable } from '@angular/core';

// enum typeOfAgGridTable{

// }

@Injectable({
  providedIn: 'root'
})
export class TableAgGridService {
  public columnDefsServices: Array<{}> = [];
  public rowDataServices = [];
  public typeOfAgGridTable;
  public rowDataURLServices;
  public gridOptionsServices;
  public defaultColDefServices;
  public onReadyServices;
  public gridPinnedServices;
  public gridFilterValueServices;
  public paginationRequired?;
  public autoPageSizeRequired?;
  public gridOptionSuppressHorizontalScroll?;
  // public gridApiServices;
  // public columnDefs;
  constructor() { }


}

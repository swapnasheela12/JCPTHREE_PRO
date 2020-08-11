import { Injectable } from '@angular/core';

// enum typeOfAgGridTable{

// }

@Injectable({
  providedIn: 'root'
})
export class TableAgGridService {
  public columnDefsServices:string[] = [];
  public rowDataServices:string[] = [];
  public typeOfAgGridTable;
  public rowDataURLServices;
  public gridOptionsServices;
  public defaultColDefServices;
  public onReadyServices;
  public gridPinnedServices;
  public gridFilterValueServices;
  public paginationRequired?;
  public autoPageSizeRequired?;
  // public gridApiServices;
  // public columnDefs;
  constructor() { }


}

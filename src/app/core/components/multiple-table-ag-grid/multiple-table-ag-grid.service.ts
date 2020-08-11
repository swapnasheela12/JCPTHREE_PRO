import { Injectable } from '@angular/core';

// enum typeOfAgGridTable{

// }

@Injectable({
  providedIn: 'root'
})
export class MultipleTableAgGridService {
  public dataServices;
  public typeOfAgGridTable;
  public rowDataURLServices?;
  public rowDataServices;
  public columnDefsServices;
  public gridOptionsServices;
  public defaultColDefServices;
  public onReadyServices;
  public paginationRequired?;
  public autoPageSizeRequired?;
  // public gridApiServices;
  // public columnDefs;
  constructor() { }
}

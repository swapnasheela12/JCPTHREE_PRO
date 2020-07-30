import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableAgGridService {
  public columnDefsServices:string[] = [];
  public rowDataServices:string[] = [];
  public ename;
  public rowDataURLServices;
  public gridOptionsServices;
  public defaultColDefServices;
  // public columnDefs;
  constructor() { }
}

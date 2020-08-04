import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgGridTreeService {
  public columnDefsServices: string[] = [];
  public rowDataServices: string[] = [];
  constructor() { }
}

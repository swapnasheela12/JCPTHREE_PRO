import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartSplitmapService {

  constructor() { }
  private subject = new BehaviorSubject({});

  triggerAndSendSplitmap(data) {
    this.subject.next(data);
  }

  recieveTriggeredData(): Observable<any> {
    return this.subject.asObservable();
  }
}

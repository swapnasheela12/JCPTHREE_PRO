import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();


  private smallCellPlannedSource = new BehaviorSubject({});
  currentsmallCellPlanned = this.smallCellPlannedSource.asObservable();

  private templateGalleryValueSource = new BehaviorSubject({});
  templateGalleryValueMessage = this.templateGalleryValueSource.asObservable();

  private checkBoxSource = new BehaviorSubject({});
  checkboxMessage = this.checkBoxSource.asObservable();

  private leftGridOptionsSource = new BehaviorSubject({});
  leftGridMessage = this.leftGridOptionsSource.asObservable();

  private fifteenMinsKpiGridOptionsSource = new BehaviorSubject({});
  fifteenMinsKpiGridMessage = this.fifteenMinsKpiGridOptionsSource.asObservable();

  private rightGridOptionsSource = new BehaviorSubject({});
  rightGridMessage = this.rightGridOptionsSource.asObservable();

  private templateGallerySource = new BehaviorSubject({});
  templateGalleryMessage = this.templateGallerySource.asObservable();

  private templateRemoveSource = new BehaviorSubject({});
  templateRemoveMessage = this.templateRemoveSource.asObservable()

  private spiderViewData = new BehaviorSubject({});
  currentSpiderData = this.spiderViewData.asObservable();

  private leftNavSelectedLayersSource =  new BehaviorSubject({});
  leftNavSelectedLayerMessage = this.leftNavSelectedLayersSource.asObservable();

  private macroComponentSource = new BehaviorSubject({});
  macroLayerMessage = this.macroComponentSource.asObservable();

  private removeLayerSource = new BehaviorSubject({});
  removeLayerMessage = this.removeLayerSource.asObservable();
  
  constructor() { }

  changeMessage(messages: Object) {
    this.messageSource.next(messages);
  }

  changesmallCellPlanned(smallCellPlanneds: Object) {
    this.smallCellPlannedSource.next(smallCellPlanneds);
  }

  templateGalleryValue(value: Object) {
    this.templateGalleryValueSource.next(value);
      this.templateGalleryValueSource.next('');
  }

  chechboxChangeMessage(checkBox: Object) {
    this.checkBoxSource.next(checkBox);

  }
  leftGridOptionMessage(leftgridOption: Object, rightgridOption: Object) {
    this.leftGridOptionsSource.next(leftgridOption);
    this.rightGridOptionsSource.next(rightgridOption);
  }
  
  fifteenMinsKpiOptionMessage(fifteenMinsKpiGridOptions: Object, rightgridOption: Object) {
    this.fifteenMinsKpiGridOptionsSource.next(fifteenMinsKpiGridOptions);
    this.rightGridOptionsSource.next(rightgridOption);
  }

  rightGridOptionMessage(gridOption: Object) {
    this.rightGridOptionsSource.next(gridOption);
  }

  templateGalleryApplyMessage(templateGallery: Object) {
    this.templateGallerySource.next(templateGallery)
  }

  templateDataRemoveMessage(template) {
    this.templateRemoveSource.next(template);
  }
  sendDataToSpider(message){
    this.spiderViewData.next(message);
  }

  leftSideNavLayerSelection(message) {
    this.leftNavSelectedLayersSource.next(message)
  }

  macroLayerSelectionMessage(message) {
    this.macroComponentSource.next(message);
  }

  removeLayer(message) {
    this.removeLayerSource.next(message);
  }
}
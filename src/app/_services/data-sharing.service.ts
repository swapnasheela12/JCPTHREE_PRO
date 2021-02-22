import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  private messageSourceDialog = new BehaviorSubject({});
  currentMessageDialog = this.messageSourceDialog.asObservable();

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

  private leftNavSelectedLayersSource = new BehaviorSubject({});
  leftNavSelectedLayerMessage = this.leftNavSelectedLayersSource.asObservable();

  private macroComponentSource = new BehaviorSubject({});
  macroLayerMessage = this.macroComponentSource.asObservable();

  private removeLayerSource = new BehaviorSubject({});
  removeLayerMessage = this.removeLayerSource.asObservable();

  private mainLayerSource = new BehaviorSubject({});
  mainLayerMessage = this.mainLayerSource.asObservable();

  private extraLayerSource = new BehaviorSubject({});
  extraLayerMessage = this.extraLayerSource.asObservable();

  private removeExtraLayerSource = new BehaviorSubject({});
  removeExtraLayerMessage = this.removeExtraLayerSource.asObservable();

  counter = 0;
  private countLogicalSource = new BehaviorSubject(this.counter);
  countLogical = this.countLogicalSource.asObservable();

  public addCommentSource = new BehaviorSubject({});
  addComment = this.addCommentSource.asObservable();

  public toggleEditModeSource = new BehaviorSubject({});
  toggleEditMode = this.toggleEditModeSource.asObservable();
  private layerchosen = new BehaviorSubject({});
  layerchosenobject$ = this.layerchosen.asObservable();

  private saveButton = new BehaviorSubject({});
  saveButtonobject$ = this.saveButton.asObservable();

  private layername = new BehaviorSubject({});
  layernameObject = this.layername.asObservable();

  private pinLayer = new BehaviorSubject({});
  pinObject = this.pinLayer.asObservable();

  private addExtraLayer = new BehaviorSubject({});
  extraLayerObject = this.addExtraLayer.asObservable();

  private patchLayerList = new BehaviorSubject({});
  patchLayerObject = this.patchLayerList.asObservable();

  private headerDetails =  new BehaviorSubject({});
  headerObject = this.headerDetails.asObservable();

  constructor() { }

  changeMessage(messages: Object) {
    this.messageSource.next(messages);
  }

  addedComment(messages: Object) {
    this.addCommentSource.next(messages);
  }

  toggle(messages: Object) {
    this.toggleEditModeSource.next(messages);
  }

  changeMessageDialog(messagesDialog: Object) {
    this.messageSourceDialog.next(messagesDialog);
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
  sendDataToSpider(message) {
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

  mainLayer(message) {
    this.mainLayerSource.next(message);
  }

  setExtraLayer(message) {
    this.extraLayerSource.next(message);
  }

  removeExtraLayer(message) {
    this.removeExtraLayerSource.next(message);
  }

  countLogicalMessage() {
    this.countLogicalSource.next(++this.counter);
  }

  extractLayerChosen(layer){
    this.layerchosen.next(layer);
  }

  submitSmartBdata(data){
    console.log('data',data);
    this.saveButton.next(data);
  }

  layerNameFunc(message){
    this.layername.next(message);
  }

  pinLayerCheck(message) {
    this.pinLayer.next(message)
  }

  addExtraLayerDynamic(layerList) {
    this.addExtraLayer.next(layerList);
  }

  patchSettingData(layerList) {
    this.patchLayerList.next(layerList);
  }

  addSpecificHeader(header) {
    this.headerDetails.next(header)
  }
}
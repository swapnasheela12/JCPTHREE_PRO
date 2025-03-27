import { Component, OnInit, ViewChild, Input,ViewEncapsulation,ViewContainerRef,ComponentFactoryResolver,ComponentRef
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {FormGroup,} from "@angular/forms";

import { SplitmapComponent } from '../splitmap/splitmap.component';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MainLayerComponent } from '../../../main-layer.component';
import { SmartSplitmapService } from '../smart-splitmap-servicce/smart-splitmap.service';



@Component({
  selector: 'app-smartbench-menubar',
  templateUrl: './smartbench-menubar.component.html',
  styleUrls: ['./smartbench-menubar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SmartbenchMenubarComponent implements OnInit {
  @ViewChild('splitmapComponent', { read: ViewContainerRef }) splitmapComponentRef: ViewContainerRef;
  public analytics: any;
  public criterias: any;
  public dataStreams: any;
  public operatorsList: any;
  public uiContent: any;
  public criteriaOptions: any;
  public splitMapForm: FormGroup;
  public panelOpenState = false;
  public operatorsArray: any = [];
  public status: boolean = false;
  public stateCriteria = true;
  public masterSelected: any;
  public isExpanded: boolean = true;
  public showAccordionCount: any;
  public checkedList: any;
  public indexValue: any;
  public operatorError: boolean = false;
  public updatedArray: [] = [];
  public selectedButtonToggle: any;
  public criteriaNamesArray: any = [];
  public criteriaOptionsArray: any = [];
  public criteriasPayload: any = [];
  public finalPayload: any = [];
  public radioButtonStatus: boolean = true;
  public gridData: any = [];
  public optionError: boolean = false;
  public toggleIsChecked: false;
  public disableSubmitButton: boolean = true;
  public resetDisabled: boolean = true;
  @Input() expanded: any = false;
  @Input() smartbenchmenuref: any;
  public componentsReferences = Array<ComponentRef<SplitmapComponent>>()
  public ref: any;
  public showBenchmark: Promise<boolean>;
  public cleargrid: any;

  constructor(private http: HttpClient,private componentFactoryResolver: ComponentFactoryResolver,
    private datashare:DataSharingService,private mainlayer:MainLayerComponent,
    private smartSplitmapService:SmartSplitmapService
    ) {
  }
  ngOnInit() {
    this.getSmartbenchConfigData();
  }

  getSmartbenchConfigData() {
    this.http.get("assets/data/layers/network/quality-and-experience/smartbenchconfig.json").subscribe(data => {
      if (data !== undefined) {
        this.uiContent = data;
        this.criterias = this.uiContent[0].criterias;
        this.criteriaOptions = this.uiContent[0].criterias;
        this.dataStreams = this.uiContent[0].data[0].dataStreams;
        this.operatorsList = this.uiContent[0].operators[0].operatorsList;
        this.showBenchmark = Promise.resolve(true);
      }
    });
  }
  //CLOSE THE WIDGET
  closeSmartbenchMenubar(){
    this.closeWidget();
    document.getElementsByClassName("fa-sliders-h")[0].classList.remove("smartmenuToggle");
  }

  closeWidget(){
    document.getElementsByTagName("app-smartbench-menubar")[0].remove();
  }

  //CHOOSE THE DATA STREAM
  datastreamSlideToggle(event: any) {
    this.hideCriteriaForLSR();
    if (event.checked) {
      this.lsrJioDataCall();
    } else {
      this.myJioDataCall();
    }
  }

  hideCriteriaForLSR() {
    const allaccordion: any = document.querySelectorAll("mat-accordion");
    [...allaccordion].forEach(accordion => {
      if (accordion.getAttribute("name") !== null) {
        if (this.toggleIsChecked) {
          if (accordion.getAttribute("name") == "Quality SINR") {
            if (accordion) {
              accordion.style.removeProperty("display");
            }
            accordion.style.display = "none";
          }
          this.resetForm();
        }
        else {
          accordion.style.display = "block";
        }
      }
    });
  }
  // MY JIO API CALL
  myJioDataCall() {
    let myJioJSON = [
      {
        name: "My JIo"
      }
    ]
    return myJioJSON;
  }

  //LSR JIO CALL
  lsrJioDataCall() {
    let lsrJioJSON = [
      {
        name: "My JIo"
      }
    ]
    return lsrJioJSON;
  }

  //OPERATOR BUTTON SELECTION
  operatorSelected(operator: any, index: any, buttonselected: any) {
    this.checkButtonToggleState(buttonselected);
    if (this.operatorsArray.indexOf(operator.name) == -1) {
      this.operatorsArray.push(operator.name);
    }
    else {
      let indexv = this.operatorsArray.indexOf(operator.name);
      this.operatorsArray.splice(indexv, 1);
    }
    this.toggleAllAccordions(this.operatorsArray);
  }

  //ENABLE ACCORDIONS TO BE USED
  checkButtonToggleState(buttonselected: any) {
    let containsClass = $(buttonselected.source._elementRef.nativeElement).hasClass("mat-button-toggle-checked")
    if (containsClass) {
      $(buttonselected.source._elementRef.nativeElement).removeClass("selectedButton");
    }
    else {
      $(buttonselected.source._elementRef.nativeElement).addClass("selectedButton");
    }
    let d = document.querySelectorAll(".selectedButton");
    d.forEach((element: any) => {
      if ($(element).hasClass("selectedButton")) {
        this.refreshForm();
      }
    });
  }

  //ENABLE ACCORDIONS TO BE USED
  toggleAllAccordions(operatorsArray: any) {
    this.criterias.forEach((element: any) => {
      if (operatorsArray.length > 0) {
        element.disabled = false;
        element.accordionState = false;
        this.operatorError = false;
        this.resetDisabled = false;
        if (element.options) {
          element.options.forEach((option: any) => {
            option.selected = false;
            option.disabled = true;
          });
        } else if (element.tablabels) {
          element.tablabels.forEach((option: any) => {
            if (option.disabled === false) {
              option.disabled = true;
            }
          });
        }
      } else {
        this.operatorError = true;
        this.refreshForm();
      }
    });
  }

  changeDecisions(operatorsArray: any) {
    this.criterias.forEach((element: any) => {
      if (operatorsArray.length > 0) {
        element.disabled = false;
        element.accordionState = false;
        this.operatorError = false;
        this.resetDisabled = false;
      } else {
        this.operatorError = true;
        this.refreshForm();
      }
    });
  }

  //GET GRID DATA
  gridCheckbox(radioButtonSelected: any, tabname: any, selected: any, tagname: any) {
    let gridData = {
      name: tagname,
      options: [{ name: radioButtonSelected }, { Tabname: tabname }]
    }
    if (this.gridData.length == 0) {
      this.gridData.push(gridData);
    } else {
      this.gridData = [];
      this.gridData.push(gridData);
    }
  }

  //CRITERIA CHECK/UNCHECK
  toggleCriteriaOptions(selected: boolean, criteriaOptions: any, index: any, event: any) {
    this.indexValue = index;
    this.disableSubmitButton = false;
    this.criterias.filter((criterialabel: any) => {
      if (criterialabel.name == criteriaOptions.name && event.checked) {
        if (criterialabel.name == "Grid") {
          this.criterias[index].tablabels.forEach((element: any) => {
            element.disabled = selected;
            this.criterias[index].selected = !selected;
            element.tabData.forEach(rb => {
              rb.disabled = false;
            });
          });
          this.enableAccordionFilterEngine(this.operatorsArray, this.indexValue, selected);
          return;
        }
        else {
          this.criterias[index].selected = !selected;
          this.criterias[index].options.forEach((option: any) => {
            option.selected = selected;
            option.disabled = selected;
          });
        }
      }
      else if (criterialabel.name == criteriaOptions.name && !event.checked) {
        this.changeDecisions(this.operatorsArray);
        if (criterialabel.name == "Grid") {
          this.criterias[index].tablabels.forEach((element: any) => {
            element.disabled = selected;
            this.criterias[index].selected = !selected;
            element.tabData.forEach((radioelms: any) => {
              radioelms.selected = false;
              radioelms.disabled = true;
              this.cleargrid = null;
              this.gridData = [];
            });
          });
          this.enableAccordionFilterEngine(this.operatorsArray, this.indexValue, selected);
          return;
        }
        this.criterias[index].selected = !selected;
        this.criterias[index].options.forEach((option: any) => {
          option.selected = !selected;
          option.disabled = selected;
        });
      }
      this.enableAccordionFilterEngine(this.operatorsArray, this.indexValue, selected);
    });
  }


  //SHOW ACCORDIONS
  enableAccordionFilterEngine(array: any, index: any, selected: any) {
    if (array.length == 0) {
      let count = 0;
    }
    else if (array.length == 1) {
      let count = 3;
      this.disableCriteriaAccordionsFn(count);
    }
    else if (array.length == 2) {
      let count = 1;
      this.disableCriteriaAccordionsFn(count);
    }
    else {
      let count = 1;
      this.disableCriteriaAccordionsFn(count);
    }

  }

  //BASED ON OPERATOR CHOSEN ENABLE/DISABLE ACCORDIONS
  disableCriteriaAccordionsFn(counter: any) {
    this.criterias.forEach((element: any, index: any) => {
      if (element.selected === true) {
        counter--;
        if (counter == 0) {
          var results = this.criterias.filter((entry: any, index: any) => {
            return entry.selected === false;
          });
          results.forEach((value: any) => {
            value.disabled = true;
            value.selected = false;
            value.accordionState = true;
          });
          return
        }
      }
    });
  }

  // REFRESH FORM
  refreshForm() {
    this.criterias.forEach((element: any, index: any) => {
      element.selected = false;
      element.disabled = true;
      element.expanded = false;
      element.accordionState = true;
      if (element.name == "Grid") {
        element.selected = false;
        element.disabled = true;
        element.tablabels.forEach((tabelement: any, index: any) => {
          tabelement.tabData.forEach((dataelement: any) => {
            dataelement.disabled = true;
          });
        });
      }
      else {
        element.options.forEach((option: any) => {
          element.selected = false;
          option.disabled = true;
        });
      }
    });
    this.cleargrid = null;
    this.gridData = [];
  }

  // RESET FORM
  resetForm() {
    this.selectedButtonToggle = undefined;
    this.refreshForm();
    this.operatorsArray = [];
    this.cleargrid = null;
    this.gridData = [];
    this.disableSubmitButton = true;
    this.resetDisabled = true;
  }

  // CRITERIA > OPTIONS
  optionSelected(optionSelected: any, criteria: any,) {
    if (this.criteriaOptionsArray.indexOf(optionSelected.name) == -1) {
      this.criteriaOptionsArray.push(optionSelected.name)
    }
    else {
      let index = this.criteriaOptionsArray.indexOf(optionSelected.name);
      this.criteriaOptionsArray.splice(index, 1);
    }
  }

  //FILTER UNSELECTED CRITERIA OPTIONS DATA
  filterPayloadData(payloadDataObject: any) {
    let filteredPayload: any = [];
    payloadDataObject.forEach((element: any) => {
      let removeValFrom: any = [];
      element.criteriaPayload.forEach((e: any, index: any) => {
        if (e.options.length == 0) {
          removeValFrom.push(index)
        }
        filteredPayload = element.criteriaPayload.filter((value: any, index: any) => {
          return removeValFrom.indexOf(index) == -1;
        });
      });
    })
    return filteredPayload;
  }

  // GET ALL CHECKED ITEMS
  getSelectedCheckboxes() {
    this.checkedList = [];
    this.criteriaOptions.forEach((element: any, index: any) => {
      if (element.selected == true) {
        if (element.name == "Grid") {
          return;
        }
        let results = element.options.filter((entry: any, index: any) => {
          return entry.selected === true;
        });

        this.checkedList.push({
          name: element.name,
          options: results
        });
      }
    });
    return this.checkedList;
  }


  //SUBMIT FORM DATA
  submitFormData() {
    this.formatDataObjects()
    this.resetForm();
  }
  formatDataObjects() {
    let payloadDataObject: any = [{
      "dataStreamJSON": this.myJioDataCall || this.lsrJioDataCall,
      "criteriaPayload": this.getSelectedCheckboxes(),
      "operators": this.operatorsArray
    }];
    this.finalPayload = payloadDataObject;
    let refinedCriteriaArrya = payloadDataObject[0].criteriaPayload.concat(this.gridData);
    payloadDataObject[0].criteriaPayload = refinedCriteriaArrya;
    console.table('payloadDataObject', payloadDataObject)
    this.smartSplitmapService.triggerAndSendSplitmap(payloadDataObject);
    this.closeWidget();
   }
}
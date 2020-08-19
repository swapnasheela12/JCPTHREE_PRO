import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { NewAndSaveTemplatePopupComponent, NewAndSaveTemplatePopupModel } from './new-and-save-template-popup/new-and-save-template-popup.component';
import { MatChip } from '@angular/material/chips';
@Component({
  selector: 'app-link-budget',
  templateUrl: './link-budget.component.html',
  styleUrls: ['./link-budget.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkBudgetComponent implements OnInit, OnDestroy {
  public templateGalleryList: any;
  showRightHolder: boolean = true;
  showDesignInfo: boolean;
  selectedChip: string = "";
  selectedToggleButton: string = "Uplink";
  technology = '5g';
  operatingBand: string[] = ['n38 : 2570 -2620 MHz', 'n41 : 2496 -2690 MHz', 'n50 : 1432 -1517 MHz', 'n51 : 1427 -1432 MHz'];
  mcsValue: string[] = ['3', '4', '5', '6'];
  subcaSpacing: string[] = ['1: 30 KHz', '2: 60 KHz', '3: 120 KHz', '1: 30 KHz'];
  nodeHardware: string[] = ['Jio - gNB', 'Samsung - gNB', 'Samsung - ODSC', 'Samsung - gNB'];
  clutterType: string[] = ['DU', 'U', 'SU', 'RU'];
  propagationModel: string[] = ['Uma-Propagation Model', 'Rma-Propagation Model', 'Umi Propagation Model', 'Uma-Propagation Model'];
  summaryDropdownList: string[] = [];
  designControls: FormArray;
  networkInputsControls: FormArray;
  gnbControls: FormArray;
  ueControls: FormArray;
  enviMarControls: FormArray;
  selectedTemplates: string[] = [];
  duplexingValue: string[] = ['TDD', 'FDD', 'FDD', 'FDD'];
  selectedTemplateCount: number = 0;
  onlyOneSelectedChip: string;
  templateGalleryListCount: number = 0;
  selectedTemplate: String;
  showGnbInfo: boolean;
  checkSelected: boolean = false;
  saveAsShowSummaryHideDisable: boolean = true;
  subscription;
  showDownloadButton: boolean = false;
  toggleDesignInfo() {
    this.showDesignInfo = !this.showDesignInfo;
  };

  showNetworkInputsInfo: boolean;
  toggleNetworkInputsInfo() {
    this.showNetworkInputsInfo = !this.showNetworkInputsInfo;
  };

  toggleGnbInfo() {
    this.showGnbInfo = !this.showGnbInfo;
  };

  showUserEquipmentInfo: boolean;
  toggleUserEquipmentInfo() {
    this.showUserEquipmentInfo = !this.showUserEquipmentInfo;
  };

  showEnviMarInfo: boolean;
  toggleEnviMarInfo() {
    this.showEnviMarInfo = !this.showEnviMarInfo;
  };

  public formControlTechnology = new FormControl();

  designList = [
    { parameter: 'Target DL Cell Edge Throughput (Mbps)', value: '28', value2: '28', value3: '28', value4: '28', info: 'This is expected single user DL throughout at cell edge' },
    { parameter: 'Target UL Cell Edge Throughput (Mbps)', value: '01', value2: '01', value3: '28', value4: '01', info: 'This is expected single user UL throughout at cell edge' },
    { parameter: 'Target Cell Edge Probability (%)', value: '90 %', value2: '90 %', value3: '90 %', value4: '90 %', info: 'Confidence at which DU & DL throughput is guaranteed at cell edge' },
  ]
  networkInputsList = [
    { parameter: 'Technology', info: 'Info About This Line' },
    { parameter: 'Duplexing', info: 'Info About This Line' },
    { parameter: 'Operating Band (MHz)', info: 'Info About This Line' },
    { parameter: 'Center Frequency of Channel (Fc)(GHz)', value1: '12', value2: '12', value3: '12', value4: '12', info: 'Info About This Line' },
    { parameter: 'Channel Bandwidth (MHz)', value1: '8', value2: '8', value3: '8', value4: '8', info: 'Info About This Line' },
    { parameter: 'Numerology : Subcarrier Spacing', info: 'Info About This Line' },
    { parameter: 'Node Hardware', info: 'Info About This Line' }
  ]
  gnbList = [
    { parameter: 'Total Tx Power (dBm)', value1: '52', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'No of Tx Port', value1: '32', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'No of Rx Port', value1: '0', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Tx Power Per Port (dBm)', value1: '36.94', value2: '52.1', value3: '23.22', value4: '21.21', editable: 'false', info: 'Info About This Line' },
    { parameter: 'RB Allocated for Target DL Cell edge Throughput', value1: '27.64', value2: '30.61', value3: '12.12', value4: '23.21', editable: 'false', info: 'Info About This Line' },
    { parameter: 'Tx Power per RB at Radio', value1: '22.12', value2: '12.22', value3: '34.21', value4: '11.11', editable: 'false', info: 'Info About This Line' },
    { parameter: 'Cable Loss (dB)', value1: '17', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Antenna Height (m)', value1: '6.5', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Antenna Gain (dBi)', value1: '15', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Antenna Array Gain)', value1: '0', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Tx Diversity Gain (dB)', value1: '75.45', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'RX Diversity Gain', value1: '3.5', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Total TX EIRP Composite Channel (dBm)', value1: '4', value2: '52', value3: '52', value4: '52', editable: 'false', info: 'Info About This Line' },
    { parameter: 'gNB Noise Figure', value1: '-6.3', value2: '52', value3: '52', value4: '52', editable: 'false', info: 'Info About This Line' },
    { parameter: 'MCS', value1: '4', value2: '52', value3: '52', value4: '52', editable: 'dropdown', info: 'Info About This Line' },
    { parameter: 'Min SINR Required (dB)', value1: '-6.3', value2: '52', value3: '52', value4: '52', editable: 'true', info: 'Info About This Line' },
    { parameter: 'Rx Faded Sensitivity (dBm)', value1: '-106.19', value2: '52', value3: '52', value4: '52', editable: 'false', info: 'Info About This Line' },
    { parameter: 'Effective Rx Faded Sensitivity (dBm)', value1: '-123.19', value2: '-12.11', value3: '-23.23', value4: '-45.78', editable: 'false', info: 'Info About This Line' },
  ]
  ueList = [
    { parameter: 'Total Tx Power (dBm)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Total No of TX Port', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Total No of Rx Port', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'UE Height (m)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Antenna Gain (dBi)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Tx Diversity Gain  (dB)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'RX diversity Gain (dB)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Rx RF Line Loss (dB)', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'RB Allocated for Target UL Cell edge Throughput', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'TX EIRP per RB (dBm)', value1: '12', value2: '21', value3: '30', value4: '4', editable: false, info: 'Info About This Line' },
    { parameter: 'UE Noise Figure', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'MCS Required', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Min SINR Required', value1: '12', value2: '21', value3: '30', value4: '4', editable: true, info: 'Info About This Line' },
    { parameter: 'Rx Faded Sensitivity (dBm)', value1: '12', value2: '21', value3: '30', value4: '4', editable: false, info: 'Info About This Line' },
    { parameter: 'Effective RX-faded Sensitivity (dBm)', value1: '12', value2: '21', value3: '30', value4: '4', editable: false, info: 'Info About This Line' }
  ]
  enviAndMarList = [
    { parameter: 'Clutter Type', editable: false, info: 'Info About This Line' },
    { parameter: 'Fast Fast Margin', value1: '12', value2: '8', value3: '4', value4: '1', editable: false, info: 'Info About This Line' },
    { parameter: 'Body Loss', value1: '12', value2: '8', value3: '4', value4: '1', editable: false, info: 'Info About This Line' },
    { parameter: 'Indoor Penetration Loss', value1: '12', value2: '8', value3: '4', value4: '1', editable: true, info: 'Info About This Line' },
    { parameter: 'Interference Margin', value1: '12', value2: '8', value3: '4', value4: '1', editable: true, info: 'Info About This Line' },
    { parameter: 'Hand Over Gain', value1: '12', value2: '8', value3: '4', value4: '1', editable: true, info: 'Info About This Line' },
    { parameter: 'S.D of Log Normal Fading', value1: '12', value2: '8', value3: '4', value4: '1', editable: false, info: 'Info About This Line' },
    { parameter: 'Slow Fading Margin', value1: '12', value2: '8', value3: '4', value4: '1', editable: false, info: 'Info About This Line' },
    { parameter: 'Select Propagation Model', editable: false, info: 'Info About This Line' },
  ]
  linkBudEstList = [
    { parameter: 'MAPL Outdoor (OD)', dl: '156.82', ul: '140.99', empty:"-" },
    { parameter: 'MAPL Indoor (ID)', dl: '134.83', ul: '118.99', empty:"-" },
    { parameter: 'RSRP Threshold (OD)', dl: '-122.78', ul: '-', empty:"-"},
    { parameter: 'RSRP Threshold (ID)', dl: '-100.98', ul: '-', empty:"-" }
  ]
  odIdList = [
    { parameter: 'Cell Radius-OD (mt)', dl: '156.82', ul: '140.99', empty:"-" },
    { parameter: 'Cell Radius-ID (mt)', dl: '134.83', ul: '118.99', empty:"-" },
  ]
  summaryList = [
    { dlBudget: 'Clutter', dl: 'DU', ul: 'DU', ulBudget: 'Clutter' },
    { dlBudget: 'Total TX Output Power', dl: '52', ul: '23', ulBudget: 'Total TX Output Power' },
    { dlBudget: 'No of Allocated DL RB', dl: '273', ul: '32', ulBudget: 'No of Allocated UL RB' },
    { dlBudget: 'Tx Power per RB', dl: '27.65', ul: '7.94', ulBudget: 'Tx Power per RB' },
    { dlBudget: 'Thermal Noise (dBm/Hz)', dl: '-174', ul: '-174', ulBudget: 'Thermal Noise (dBm/Hz)' },
    { dlBudget: 'Noise Figure of UE', dl: '7', ul: '3', ulBudget: 'Noise Figure of gNB' },
    { dlBudget: 'Target Cell edge DL TP (Mbps)', dl: '2B', ul: '1', ulBudget: 'Target Cell edge UL TP (Mbps)' },
    { dlBudget: 'Required SINR at UE', dl: '-2', ul: '-6.3', ulBudget: 'Required SINR at gNB' },
    { dlBudget: 'Sensitivity of gNB at target DL TP', dl: '-92.07', ul: '-125.5', ulBudget: 'Sensitivity of gNB at target UL TP' },
    { dlBudget: 'Gain gNB Antenna', dl: '23.5', ul: '23.5', ulBudget: 'Gain gNB Antenna' },
    { dlBudget: 'Gain UE Antenna ', dl: '0', ul: '0', ulBudget: 'Gain UE Antenna' },
    { dlBudget: 'Losses (cable)', dl: '0', ul: '0', ulBudget: 'Losses (cable)' },
    { dlBudget: 'Bosy Loss', dl: '2', ul: '2', ulBudget: 'Bosy Loss' },
    { dlBudget: 'Indoor Penetration Loss', dl: '22', ul: '22', ulBudget: 'Indoor Penetration Loss' },
    { dlBudget: 'Margin(LNF+Fast Fading)', dl: '8', ul: '8', ulBudget: 'Margin(LNF+Fast Fading)' },
    { dlBudget: 'Max Path Loss OD', dl: '154.88', ul: '144.00', ulBudget: 'Max Path Loss OD' },
    { dlBudget: 'Max Path Loss ID', dl: '132.88', ul: '122.00', ulBudget: 'Max Path Loss ID' },
    { dlBudget: 'Cell Radius-Indoor (m)', dl: '550', ul: '320', ulBudget: 'Cell Radius-Indoor (m)' },
  ]

  constructor(public dialog: MatDialog, private dataShare: DataSharingService, private cdRef: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.subscription = this.dataShare.templateGalleryMessage.subscribe(
      (formData) => {
        this.templateGalleryList = [];
        this.selectedTemplates = [];
        if (Object.keys(formData).length !== 0) {
          this.templateGalleryList = formData;
          this.cdRef.detectChanges();
          this.templateGalleryListCount = this.templateGalleryList.length;
          this.selectedTemplate = this.templateGalleryList[0];
          if (this.templateGalleryListCount == 1) {
            this.onlyOneSelectedChip = this.templateGalleryList;
          }
        }
      }
    )
    // Design Object Control
    const designGroups = this.designList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required),
        value4: new FormControl(entity.value4, Validators.required),
      });
    });
    this.designControls = new FormArray(designGroups);

    // Network Inputs Control
    const networkInputsGroups = this.networkInputsList.map(entity => {
      return new FormGroup({
        value1: new FormControl(entity.value1, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required),
        value4: new FormControl(entity.value4, Validators.required),
      });
    });
    this.networkInputsControls = new FormArray(networkInputsGroups);

    // gNB Control
    const gnbGroups = this.gnbList.map(entity => {
      return new FormGroup({
        value1: new FormControl(entity.value1, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required),
        value4: new FormControl(entity.value4, Validators.required),
      });
    });
    this.gnbControls = new FormArray(gnbGroups);

    // User Equipment (UE) Control
    const ueGroups = this.ueList.map(entity => {
      return new FormGroup({
        value1: new FormControl(entity.value1, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required),
        value4: new FormControl(entity.value4, Validators.required),
      });
    });
    this.ueControls = new FormArray(ueGroups);

    // Environment and Margins Control
    const enviMarGroups = this.enviAndMarList.map(entity => {
      return new FormGroup({
        value1: new FormControl(entity.value1, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
        value3: new FormControl(entity.value3, Validators.required),
        value4: new FormControl(entity.value4, Validators.required),
      });
    });
    this.enviMarControls = new FormArray(enviMarGroups);
  }

  // Design Object Control
  getDesignControl(index: number, field: string): FormControl {
    return this.designControls.at(index).get(field) as FormControl;
  }
  updateDesignField(index: number, field: string) {
    const designControl = this.getDesignControl(index, field);
    if (designControl.valid) {
      this.designList = this.designList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: designControl.value
          }
        }
        return e;
      })
    }
  }

  // Network Inputs Control
  getNetworkInputsControl(index: number, field: string): FormControl {
    return this.networkInputsControls.at(index).get(field) as FormControl;
  }
  updateNetworkInputsField(index: number, field: string) {
    const networkInputsControl = this.getNetworkInputsControl(index, field);
    if (networkInputsControl.valid) {
      this.networkInputsList = this.networkInputsList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: networkInputsControl.value
          }
        }
        return e;
      })
    }
  }

  // gNB Control
  getGnbInputControl(index: number, field: string): FormControl {
    return this.gnbControls.at(index).get(field) as FormControl;
  }
  updateGnbField(index: number, field: string) {
    const gnbControl = this.getGnbInputControl(index, field);
    if (gnbControl.valid) {
      this.gnbList = this.gnbList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: gnbControl.value
          }
        }
        return e;
      })
    }
  }

  // User Equipment (UE) Control
  getUeInputControl(index: number, field: string): FormControl {
    return this.ueControls.at(index).get(field) as FormControl;
  }
  updateUeField(index: number, field: string) {
    const ueControl = this.getUeInputControl(index, field);
    if (ueControl.valid) {
      this.ueList = this.ueList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: ueControl.value
          }
        }
        return e;
      })
    }
  }
  // Environment and Margins Control
  getEnviMarInputControl(index: number, field: string): FormControl {
    return this.enviMarControls.at(index).get(field) as FormControl;
  }
  updateEnviMarField(index: number, field: string) {
    const enviMarControl = this.getEnviMarInputControl(index, field);
    if (enviMarControl.valid) {
      this.enviAndMarList = this.enviAndMarList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: enviMarControl.value
          }
        }
        return e;
      })
    }
  }
  removeTemplateChip(item: MatChip, template) {
    this.templateGalleryListCount--;
    this.checkSelected = item.selected;
    if (this.checkSelected) {
      this.saveAsShowSummaryHideDisable = true;
    }
    const index = this.templateGalleryList.indexOf(template);
    this.templateGalleryList.splice(index, 1);
    this.dataShare.templateDataRemoveMessage(template);
    this.selectedTemplateCount = this.templateGalleryList.length;
    this.selectedTemplate = this.templateGalleryList[0];
    if (this.selectedTemplateCount == 1) {
      this.onlyOneSelectedChip = this.templateGalleryList;
    }
  }
  compute(e) {
    // console.log(e)
  }
  showRightHolderToggle() {
    this.showRightHolder = !this.showRightHolder;
  }
  newSaveAsTemplatePopup(data): void {
    const title = data;
    const dialogData = new NewAndSaveTemplatePopupModel(title);
    const dialogRef = this.dialog.open(NewAndSaveTemplatePopupComponent, {
      width: '550px',
      height: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(data => {
    })
  }
  isSelected(item: MatChip, template) {
    item.toggleSelected();
    this.checkSelected = item.selected;
    if (this.checkSelected) {
      this.selectedChip = template;
      this.saveAsShowSummaryHideDisable = false;
    } else {
      this.selectedChip = "";
      this.saveAsShowSummaryHideDisable = true;
    }
  }
  // toggleOffer(template: any): void {
  //   let index = this.selectedTemplates.indexOf(template);
  //   if (index >= 0) {
  //     this.selectedTemplates.splice(index, 1);
  //   } else {
  //     this.selectedTemplates.push(template);
  //   }
  //   this.selectedTemplate = this.selectedTemplates[1];
  //   this.selectedTemplateCount = this.selectedTemplates.length;
  //   if (this.selectedTemplateCount == 1) {
  //     this.onlyOneSelectedTemplate = this.selectedTemplates;
  //   }
  // }
  onTabChanged(e) {
    console.log(e)
    if(e.index == 1){
     this.showDownloadButton =  true
      this.showRightHolder = false
    } else{
      this.showDownloadButton =  false;
    }
  }
  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy(){
      this.subscription.unsubscribe()
  }
}

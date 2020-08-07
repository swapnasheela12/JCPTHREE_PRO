import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-link-budget',
  templateUrl: './link-budget.component.html',
  styleUrls: ['./link-budget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkBudgetComponent implements OnInit {
  public templateGalleryList: any;
  show:boolean = true;
  showDesignInfo: boolean;
  toggleDesignInfo() {
    this.showDesignInfo = !this.showDesignInfo;
  };

  showNetworkInputsInfo: boolean;
  toggleNetworkInputsInfo() {
    this.showNetworkInputsInfo = !this.showNetworkInputsInfo;
  };
  technology = '5g';
  duplexing = 'TDD';
  operatingBand = 'n38';
  subcaSpacing = 'option2';
  nodeHardware = 'Jio - gNB';

  showGnbInfo: boolean;
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
  clutterType = "DU";

  public formControlTechnology = new FormControl();
  designList = [
    { parameter: 'Target DL Cell Edge Throughput (Mbps)', value: '28', value2:'wqwqwqw', info:'This is expected single user DL throughout at cell edge'},
    { parameter: 'Target UL Cell Edge Throughput (Mbps)', value: '01', value2:'wqwqwqw', info:'This is expected single user UL throughout at cell edge'},
    { parameter: 'Target Cell Edge Probability (%)', value: '90 %', value2:'wqwqwqw', info:'Confidence at which DU & DL throughput is guaranteed at cell edge' },
  ]
  networkInputsList = [
    { parameter: 'Technology', info:'Info About This Line'},
    { parameter: 'Duplexing', info:'Info About This Line'},
    { parameter: 'Operating Band (MHz)', info:'Info About This Line'},
    { parameter: 'Center Frequency of Channel (Fc)(GHz)', value:'12', info:'Info About This Line'},
    { parameter: 'Channel Bandwidth (MHz)',  value:'8', info:'Info About This Line'},
    { parameter: 'Numerology : Subcarrier Spacing', info:'Info About This Line'},
    { parameter: 'Node Hardware', info:'Info About This Line'}
  ]
  gnbList = [
    { parameter: 'Total Tx Power (dBm)', value:'52', editable: true , info:'Info About This Line'},
    { parameter: 'No of Tx Port', value:'32' ,editable: true , info:'Info About This Line'},
    { parameter: 'No of Rx Port', value:'0' ,editable: true , info:'Info About This Line'},
    { parameter: 'Tx Power Per Port (dBm)', value:'36.94' ,editable: false , info:'Info About This Line'},
    { parameter: 'RB Allocated for Target DL Cell edge Throughput', value:'27.64' ,editable: false , info:'Info About This Line'},
    { parameter: 'Tx Power per RB at Radio', value:'0' ,editable: false , info:'Info About This Line'},
    { parameter: 'Cable Loss (dB)', value:'17' ,editable: true , info:'Info About This Line'},
    { parameter: 'Antenna Height (m)', value:'6.5' ,editable: true , info:'Info About This Line'},
    { parameter: 'Antenna Gain (dBi)', value:'15' ,editable: true , info:'Info About This Line'},
    { parameter: 'Antenna Array Gain)', value:'0' ,editable: true, info:'Info About This Line'},
    { parameter: 'Tx Diversity Gain (dB)', value:'75.45' ,editable: true, info:'Info About This Line'},
    { parameter: 'RX Diversity Gain', value:'3.5' ,editable: true, info:'Info About This Line'},
    { parameter: 'Total TX EIRP Composite Channel (dBm)', value:'4' ,editable: false, info:'Info About This Line'},
    { parameter: 'gNB Noise Figure', value:'-6.3' ,editable: false, info:'Info About This Line'},
    { parameter: 'MCS', value:'4' ,editable: true, info:'Info About This Line'},
    { parameter: 'Min SINR Required (dB)', value:'-6.3' ,editable: true, info:'Info About This Line'},
    { parameter: 'Rx Faded Sensitivity (dBm)', value:'-106.19' ,editable: false, info:'Info About This Line'},
    { parameter: 'Effective Rx Faded Sensitivity (dBm)', value:'-123.19' ,editable: false, info:'Info About This Line'},
  ]
  ueList = [
    { parameter: 'Total Tx Power (dBm)', value:'12', editable: true, info:'Info About This Line'},
    { parameter: 'Total No of TX Port', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Total No of Rx Port', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'UE Height (m)', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Antenna Gain (dBi)', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Tx Diversity Gain  (dB)', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'RX diversity Gain (dB)', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Rx RF Line Loss (dB)', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'RB Allocated for Target UL Cell edge Throughput', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'TX EIRP per RB (dBm)', value:'12' ,editable: false, info:'Info About This Line'},
    { parameter: 'UE Noise Figure', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'MCS Required', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Min SINR Required', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Rx Faded Sensivity (BW)', value:'12' ,editable: false, info:'Info About This Line'},
    { parameter: 'Effective RX-faded Sensivity ', value:'12' ,editable: false, info:'Info About This Line'}
  ]
  enviAndMarList = [
    { parameter: 'Clutter Type', value:'12', editable: false, info:'Info About This Line'},
    { parameter: 'Fast Fast Margin', value:'12' ,editable: false, info:'Info About This Line'},
    { parameter: 'Body Loss', value:'12' ,editable: false, info:'Info About This Line'},
    { parameter: 'Indoor Penetration Loss', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Interference Margin', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'Hand Over Gain', value:'12' ,editable: true, info:'Info About This Line'},
    { parameter: 'S.D of Log Normal Fading', value:'12' ,editable: false, info:'Info About This Line'},
    { parameter: 'Slow Fading Margin', value:'12' ,editable: false, info:'Info About This Line'}
  ]
  linkBudEstList = [
    { parameter: 'MAPL Outdoor (OD)', dl:'156.82', ul:'140.99'},
    { parameter: 'MAPL Indoor (ID)', dl:'134.83', ul:'118.99'},
    { parameter: 'RSRP Threshold (OD)', dl:'-122.78', ul:'-'},
    { parameter: 'RSRP Threshold (ID)', dl:'-100.98', ul:'-'}
  ]
  odIdList = [
    { parameter: 'MAPL Outdoor (OD)', dl:'156.82', ul:'140.99'},
    { parameter: 'MAPL Indoor (ID)', dl:'134.83', ul:'118.99'},
  ]
  designControls: FormArray;
  networkInputsControls: FormArray;
  gnbControls: FormArray;
  ueControls: FormArray;
  enviMarControls: FormArray;
  constructor(private dataShare: DataSharingService) { }

  ngOnInit(): void {
    this.dataShare.templateGalleryMessage.subscribe(
      (formData) => {
        this.templateGalleryList = formData;
      }
    )
    // console.log(this.formControlTechnology)

    // Design Object Control
    const designGroups = this.designList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
        value2: new FormControl(entity.value2, Validators.required),
      });
    });
    this.designControls = new FormArray(designGroups);

    // Network Inputs Control
    const networkInputsGroups = this.networkInputsList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
      });
    });
    this.networkInputsControls = new FormArray(networkInputsGroups);

    // gNB Control
    const gnbGroups = this.gnbList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
      });
    });
    this.gnbControls = new FormArray(gnbGroups);

    // User Equipment (UE) Control
    const ueGroups = this.ueList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
      });
    });
    this.ueControls = new FormArray(ueGroups);

    // Environment and Margins Control
    const enviMarGroups = this.enviAndMarList.map(entity => {
      return new FormGroup({
        value: new FormControl(entity.value, Validators.required),
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
  removeTemplateChip(template) {
    const index = this.templateGalleryList.indexOf(template);
    if (index >= 0) {
      this.templateGalleryList.splice(index, 1);
    }
  }
  onTechnologyChanged(item) {
    // console.log(item)
  }
}

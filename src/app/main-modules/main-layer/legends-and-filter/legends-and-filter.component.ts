import { CustomLegendsComponent } from './custom-legends/custom-legends.component';
import { Component, OnInit, Inject, ChangeDetectorRef, EventEmitter, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { ColorPickerService, Cmyk } from 'ngx-color-picker'

import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';

// declare var $: any;

@Component({
  selector: 'app-legends-and-filter',
  templateUrl: './legends-and-filter.component.html',
  styleUrls: ['./legends-and-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ColorPickerService]
})
export class LegendsAndFilterComponent implements OnInit {
  public selectedLayerSearchValue;
  public layerListValue;
  public selectedLayerTableName;
  public selectedLayers = {};
  public selectedLayerCtrl: FormControl = new FormControl();
  @ViewChild('select') select: MatSelect;
  allSelected=false;
  @Input() colorOutline: string;
  @Input() colorFill: string = 'red';
  @Input() colorFill2: string = 'orange';
  @Input() colorFill3: string = 'blue';
  @Input() colorFill4: string = 'pink';
  // selectedColor = '';
  // selectedColorValue;

  // colors = [
  //   {
  //     name: 'yellow',
  //     value: '#ffff00'
  //   },
  //   {
  //     name: 'red',
  //     value: '#ff3300'
  //   },
  //   {
  //     name: 'blue',
  //     value: '#0000ff'
  //   }
  // ];

  // onChange(value){
  //   console.log(value,"value");

  //   this.selectedColor = value;
  //   this.selectedColorValue = value;
  // }

  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  items = [
    { value: 1, legend: '#F44336' },
    { value: 3, legend: '#FF9800' },
    { value: 5, legend: '#8BC34A' },
    // { value: 7, legend: '#4CAF50' },
    { value: 8, legend: '#3F51B5' },
    { value: 9, legend: '#03A9F4' }
  ];
  legendList = [
    { svg: "assets/images/Layers/topologies/strcu-equip-legend/AG1.png", name: 'AG1' },
    { svg: "assets/images/Layers/topologies/strcu-equip-legend/AG2.png", name: 'AG2' }
  ];
  value: number;
  minValue: number;
  maxValue: number;
  // highValue: number = 90;
  options: Options = {
    floor: -140,
    ceil: -40,
    step: 20,
    showSelectionBarFromValue: 0,
    // selectionBarGradient: {
    //   from: 'white',
    //   to: '#0078D7'
    // },
    showTicks: true,
    // showTicksValues: true,
    getLegend: (value: number): string => {
      return '<b></b>' + value;
    },

  };



  // ///////datepicker//////////
  formDate = this.fb.group({
    selected: [
      {
        startDate: '2019-12-11T18:30:00.000Z',
        endDate: '2019-12-12T18:29:59.000Z',
      },
      Validators.required,
    ],
  });
  locale: LocaleConfig = {
    format: 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
    displayFormat: 'YYYY-MM-DD',
    applyLabel: 'Ok',
    clearLabel: 'Clear'

  };

  private inited;

  layers: any = [
    { value: 'Analytics - RF In Bulding', viewValue: 'Analytics - RF In Bulding' },
    { value: 'Analytics - RF In Bding', viewValue: 'Analytics - RF In Bding' },
    { value: 'Analytics - RF In B', viewValue: 'Analytics - RF In B' },
  ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  showRouteLegends: boolean = false;
  showfivegLegends: boolean = false;
  showCommonLegends: boolean = false;
  extraLayer: Subscription;
  countSub: Subscription;
  allLayers=[];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LegendsAndFilterComponent>,
    private datashare: DataSharingService,
    private cd: ChangeDetectorRef,
    private cpService: ColorPickerService
  ) {
    this.datashare.leftNavSelectedLayerMessage.subscribe((selectedLayersAll) => {
      this.selectedLayers = selectedLayersAll;
    });
  }
  counts = {};
  ngOnInit(): void {
      this.datashare.extraLayerMessage.subscribe(
        (layer) => {
          if (Object.keys(layer).length !== 0) {
            for (let i = 0; i < this.selectedLayers['length']; i++) {
              this.allLayers.push(this.selectedLayers[i].parentToChild);
            }
            if (this.allLayers.includes('Topologies-Structure-Planned') && !this.allLayers.includes('Logical-Connectivity')) {
              this.selectedLayers[this.selectedLayers['length']] = layer;
            }
            }
          }
        );
      
      this.datashare.removeExtraLayerMessage.subscribe(
        (removeExtraLayer) => {
          if (this.allLayers.includes(removeExtraLayer['parentToChild'])) {
            let indexLogicalConnectivity = this.allLayers.indexOf(removeExtraLayer['parentToChild']);
            this.selectedLayers[indexLogicalConnectivity] = {};
            this.selectedLayers['length'] = this.selectedLayers['length'] - 1;
          }
        }
      );
      this.dialogRef.afterOpened().subscribe(() => {
        this.inited = true;
      })
  }

  ngAfterViewInit() {
    // this.setInitialValue();
    this.cd.detectChanges();
  }
  onChangeLayer(layer) {
    console.log(layer)
    switch (layer.value) {
      case "Sites-OnAir-Macro-Macro4G":
        this.showRouteLegends = false;
        this.showfivegLegends = false;
        this.showCommonLegends = true;
        this.minValue = -110;
        this.maxValue = -40;
        this.options = {
          floor: -180,
          ceil: -20,
          step: 30,
          showSelectionBarFromValue: 0,
          showTicks: true,
          getLegend: (value: number): string => {
            return '<b></b>' + value;
          },
        };
        break;
      case "Topologies-Fibre-Route-Ready-Core":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Fibre-Route-Ready-Collector":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Fibre-Route-Planned-Core":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Fibre-Route-Planned-Collector":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Structure-Planned":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Structure-Ready":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Equipment-Planned":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Topologies-Equipment-Ready":
        this.showRouteLegends = true;
        this.showCommonLegends = false;
        this.showfivegLegends = false;
        break;
      case "Logical-Connectivity":
          this.showRouteLegends = false;
          this.showCommonLegends = false;
          this.showfivegLegends = true;
          break;

    }
    // if(layer.value == 'Macro') {
    // } else {
    //   this.minValue = -60;
    //   this.maxValue = -40;
    //   this.options = {
    //     floor: -140,
    //     ceil: -40,
    //     step: 20,
    //     showSelectionBarFromValue: 0,
    //     // selectionBarGradient: {
    //     //   from: 'white',
    //     //   to: '#0078D7'
    //     // },
    //     showTicks: true,
    //     // showTicksValues: true,
    //     getLegend: (value: number): string => {
    //       return '<b></b>' + value;
    //     },

    //   };
    // }

    // if ( this.selectedLayerTableName == 'Macro') {
    //   // this.listOfKpiDetails = this.listOfKpiDetailsOther;
    //   // this.kpiDetailsChart = this.kpiDetailsChartOther;
    //   this.listOfKpiDetails  = [
    //     {
    //       title: "Macro Planned RSRP ALL",
    //       color: "#0f73bd",
    //       value: "-60.54 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 2300",
    //       color: "#0f73bd",
    //       value: "-66.39 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 1800",
    //       color: "#0f73bd",
    //       value: "-63.01 dBm"
    //     },
    //     {
    //       title: "Macro Planned RSRP 850",
    //       color: "#0f73bd",
    //       value: "-61.38 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP ALL",
    //       color: "#96ce58",
    //       value: "-100.90 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 2300",
    //       color: "#96ce58",
    //       value: "-100.92 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 1800",
    //       color: "#96ce58",
    //       value: "-100.63 dBm"
    //     },
    //     {
    //       title: "NetVelocity Macro RSRP 850",
    //       color: "#96ce58",
    //       value: "-100.38 dBm"
    //     },
    //   ];
    //   this.kpiDetailsChart.destroy();
    //   this.kpiDetailsChart = new Chart(
    //     {
    //       exporting: {
    //         enabled: false
    //       },
    //       chart: {
    //         type: 'column',
    //         backgroundColor: "transparent",
    //         height: 178,
    //         spacingTop: 20
    //       },
    //       title: {
    //         text: null,
    //       },
    //       yAxis: [{
    //         min: 0,
    //         max: 100,
    //         tickInterval: 50,
    //         title: {
    //           text: '% Macro Area covered wrt DL <br> Throughput range(CDF)',
    //           rotation: 270,
    //           x: 5,
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         labels: {
    //           format: '{value}%',
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         opposite: true
    //       }, {
    //         min: 0,
    //         max: 100,
    //         tickInterval: 50,
    //         title: {
    //           text: '% Area covered wrt DL <br> Throughput range(PDF)',
    //           x: -15,
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         },
    //         labels: {
    //           format: '{value}%',
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '12px'
    //           },
    //         }
    //       }],
    //       xAxis: {
    //         categories: ['0 <= <br>THP<br>< 2', '2 <= <br>THP<br>< 6',
    //           '6 <= <br>THP<br>< 10', '10 <= <br>THP<br>< 20',
    //           '20 <= <br>THP<br>< 26', '26 <= <br>THP<br>< 100'
    //         ],
    //         labels: {
    //           style: {
    //             color: '#000000',
    //             fontFamily: 'Roboto',
    //             fontWeight: 'normal',
    //             fontSize: '10px'
    //           },
    //           rotation: 0,
    //         }
    //       },
    //       legend: {
    //         enabled: false,
    //       },
    //       plotOptions: {
    //         series: {
    //           color: 'yellow',
    //           marker: {
    //             enabled: true
    //           },
    //           events: {
    //             legendItemClick: function (event) {
    //               if (!this.visible) return true;
    //               var seriesIndex = this.index;
    //               var series = this.chart.series;
    //               for (var i = 0; i < series.length; i++) {
    //                 if (series[i].index != seriesIndex) {
    //                   series[i].visible ? series[i].hide() : series[i].show();
    //                 }
    //               }
    //               return false;
    //             }
    //           },
    //           // pointPadding: 0,
    //           // pointWidth: 30
    //         },
    //         column: {
    //           dataLabels: {
    //             enabled: true,
    //             style: {
    //               color: '#000000',
    //               fontFamily: 'Roboto',
    //               fontWeight: 'normal',
    //               fontSize: '12px'
    //             },
    //           }
    //         }

    //       },
    //       credits: {
    //         enabled: false
    //       },
    //       series: [{
    //         name: 'Brands',
    //         type: 'column',
    //         yAxis: 1,
    //         data: [{
    //           name: '0 <= <br>THP<br>< 2',
    //           y: 0.01,
    //           color: '#fa151b'
    //         }, {
    //           name: '2 <= <br>THP<br>< 6',
    //           y: 3.05,
    //           color: '#FC9337'
    //         }, {
    //           name: '6 <= <br>THP<br>< 10',
    //           y: 3.70,
    //           color: '#96ce58'
    //         }, {
    //           name: '10 <= <br>THP<br>< 20',
    //           y: 34.08,
    //           color: '#3eaf1e'
    //         }, {
    //           name: '20 <= <br>THP<br>< 26',
    //           y: 5.03,
    //           color: '#3aa4f2'
    //         }, {
    //           name: '26 <= <br>THP<br>< 100',
    //           y: 54.13,
    //           color: '#0f73bd'
    //         }]


    //       }, {
    //         name: 'Temperature',
    //         type: 'spline',
    //         data: [0, 3.05, 3.07, 40, 48, 100]
    //       }]
    //   }

    //   );
    // } else {
    //   this.listOfKpiDetails = this.listOfKpiDetailsOther;
    //   this.kpiDetailsChart = this.kpiDetailsChartOther;
    // }
  }

  openedChange(sda) {
    this.selectedLayerSearchValue = '';
  }

  onCloseClick(): void {
    if (this.inited) {
      this.dialogRef.close();
    }
  }

  customLegendsSettingPopFun() {
    var customLegendsSettingListDialogRef = {
      width: '536px',
      height: '965px',
      position: { bottom: '0px', right: "0px" },
      panelClass: "table-view-layers-dialog-container",
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disableClose: true,
      hasBackdrop: true
    }
    const dialogRef = this.dialog.open(CustomLegendsComponent, customLegendsSettingListDialogRef);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    });
  }

  ngOnDestroy() {
    if (this.countSub) {
      this.countSub.unsubscribe();
    }
    if (this.extraLayer) {
      this.extraLayer.unsubscribe();
    }
  }

}
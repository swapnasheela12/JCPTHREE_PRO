
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { SideNavService } from '../_services/side-nav.service';
import { DataSharingService } from '../_services/data-sharing.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';


interface DataObject {
  [key: string]: any;
}


@Component({
  selector: "app-home-jcp-three",
  templateUrl: "./home-jcp-three.component.html",
  styleUrls: ["./home-jcp-three.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'translate3d(-5px,0,0) rotate(-45deg)',
        transformOrigin: 'right'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'translate3d(-5px,1px,0) rotate(45deg)',
        transformOrigin: 'right'
      })),
      transition('* => *', [
        animate('0.3s')
      ]),
    ]),
  ]
})


export class HomeJcpThreeComponent implements OnInit, AfterViewInit {
  public expanded: boolean;
  public toggleActive: boolean = true;
  public state: string = 'default';
  public isHamburguer: boolean = true;
  public displayHomeHeader: boolean = false;
  public route: string;
  public startTimeIndex;
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;


  public initialEnter: any = '';
  public currentPage;
  public timeSpentOnPages: DataObject = [];
  public moment: DataObject = moment;
  public pageUrlVar: string;
  public timeSpendVar: number;
  public layerIdList = [];
  public dataPayload = [];
  public sendingPostCallInProgreess: boolean = false;
  constructor(private router: Router, private location: Location, private sidenavService: SideNavService, private datashare: DataSharingService,
    private http: HttpClient) {
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
        if (this.route == "/JCP/Layers") {
          this.displayHomeHeader = true;
          $("#headerIdHome").removeClass("jcp-toolbar-main-container");
          $("#headerIdHome").addClass("jcp-toolbar-main-container-layers");
          $("#header-container-id").removeClass("header-jcp-container");
          $("#header-container-id").addClass("header-jcp-container-layers");
          $("#route-outlet-id").removeClass("px-3");
          $("#route-outlet-id").addClass("p-0 h-100").removeClass("active-jcp-page-route");
        } else {
          this.displayHomeHeader = false;
          $("#headerIdHome").addClass("jcp-toolbar-main-container");
          $("#headerIdHome").removeClass("jcp-toolbar-main-container-layers");
          $("#header-container-id").addClass("header-jcp-container");
          $("#header-container-id").removeClass("header-jcp-container-layers");
          $("#route-outlet-id").addClass("px-3");
          $("#route-outlet-id").removeClass("p-0 h-100").addClass("active-jcp-page-route");
        }
      } else {
        this.route = "Home";
      }
    });


    // this.router.events.subscribe((event: any) => {
    //   if (!this.currentPage) {
    //     this.currentPage = event.url;
    //     this.initialEnter = Date.now();
    //   }
    //   if (this.currentPage !== event.url) {
    //     const timeSpent = Date.now() - this.initialEnter;
    //     const timeLeave = Date.now();
    //     const timeEnter = this.initialEnter;
    //     const pageInfo = {
    //       pageUrl: this.currentPage,
    //       timeEnter,
    //       timeSpent,
    //       timeLeave
    //     }
    //     this.timeSpentOnPages.push(pageInfo);
    //     this.initialEnter = Date.now();
    //     this.currentPage = event.url;
    //   }
    // })
  }


  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    this.styleStripBarMenu();
    this.datashare.changeMessage(this.toggleActive)
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngAfterViewInit() {
    //this.configureLayerProperties();
    //this.isLayerUnchecked();
    //this.sendTrackedData();
  }

  //CONFIGURE THE TIMESTAMP OBJECT
  configureLayerProperties() {
    this.datashare.checkedLayersOnly$.subscribe(layer => {
      let layerDetails: any = layer;
      if (Object.keys(layerDetails).length == 0) {
        return;
      }
      if (typeof layerDetails.id == "number" && layerDetails.checkbox) {
        if (this.layerIdList.length > 0) {
          if (this.layerIdList.filter(e => e.type === 'other').length > 0) {
            let terminatePreviousLayer = this.layerIdList.filter(e => e.type === 'other')[0];
            this.triggerPreviousLayerEndTime(terminatePreviousLayer)
            this.dequeLayerFromStack(this.layerIdList, terminatePreviousLayer.id)
            this.layerIdList.push({
              id: layerDetails.id,
              time: this.setCurrentTimestamp(),
              type: "checkbox"
            });
          }
          else {
            this.layerIdList.push({
              id: layerDetails.id,
              time: this.setCurrentTimestamp(),
              type: "checkbox"
            });
          }
        }
        else {
          this.layerIdList.push({
            id: layerDetails.id,
            time: this.setCurrentTimestamp(),
            type: "checkbox"
          });
        }
      }
      else {
        if (this.layerIdList.length == 0) {
          this.layerIdList.push({
            id: layerDetails.id,
            time: this.setCurrentTimestamp(),
            type: "other"
          });
          this.switchBetweenLayers(this.layerIdList, layerDetails.id);
        }
        else if (this.layerIdList.length > 0) {
          //PREVENT REPEATED CLICKS
          if (this.layerIdList[this, this.layerIdList.length - 1].id == layerDetails.id) {
            return;
          }
          else {
            this.layerIdList.push({
              id: layerDetails.id,
              time: this.setCurrentTimestamp(),
              type: "other"
            });
            this.switchBetweenLayers(this.layerIdList, layerDetails.id);
          }
        }
      }
    });
  }

  //SET THE CURRENT TIMESTAMP
  setCurrentTimestamp() {
    const currentdate = Date.now();
    const timestamp = moment(currentdate);
    timestamp.format('h:mm:ss');
    return timestamp;
  }

  //NAVIGATE THROUGH LAYERS AND CALCULATE THE TIME DIFFERENCE
  switchBetweenLayers(layerlist, currentObjectId) {
    if (layerlist.length > 1) {
      if (this.layerIdList.filter(e => e.type === 'other').length > 0 && this.layerIdList.filter(e => e.type === 'checkbox').length > 0) {
        let otherArray = this.layerIdList.filter((object: any, index: any) => {
          return object.type === "other";
        });
        //REMOVE THE PREVIOUS PAGE CHECKED ONES
        if (otherArray.length == 1) {
          var firstTypeOfotherObject = otherArray[0];
          let index = this.layerIdList.indexOf(firstTypeOfotherObject);
          this.startTimeIndex = index;
          let newArray = this.layerIdList.pop();

          //TERMINATE THE TIME FOR CHECKED ONES LAYERS
          this.layerIdList.forEach((checkedones) => {
            this.triggerPreviousLayerEndTime(checkedones)
          });
          this.layerIdList = [...newArray];
          this.startTimeIndex = 0;
          return;
        }
      }

      else if (this.layerIdList.filter(e => e.type === 'other').length > 0) {
        this.startTimeIndex = this.startTimeIndex > 0 ? this.startTimeIndex : 0;
        let endTimeIndex = this.startTimeIndex + 1;
        let startTime = layerlist[this.startTimeIndex].time;
        let endTime = layerlist[endTimeIndex].time;
        let time = this.calculateTimeDifference(endTime, startTime);
        this.startTimeIndex = endTimeIndex;
        let timeSpentEachLayer = {
          timeSpent: time,
          screenId: layerlist[this.startTimeIndex - 1].id,
          userId: 7722778
        }
        this.queueLayerIntoTheStack(this.layerIdList, currentObjectId)
        this.startTimeIndex = this.startTimeIndex - 1;
        this.dataPayload.push(timeSpentEachLayer);
      }
    }
  }

  //OPERATIONS ONCE LAYER IS UNCHECKED
  isLayerUnchecked() {
    this.datashare.uncheckedLayersOnly$.subscribe(id => {
      //TERMINATE THE OTHER STACK
      if (this.layerIdList.filter(e => e.type === 'other').length > 0) {
        let terminatePreviousLayer = this.layerIdList.filter(e => e.type === 'other')[0];
        this.triggerPreviousLayerEndTime(terminatePreviousLayer)
        this.dequeLayerFromStack(this.layerIdList, terminatePreviousLayer.id)

      }
      if (typeof id == "number" && this.layerIdList.length > 0) {
        let uncheckedLayer = this.layerIdList.filter((object: any, index: any) => {
          return object.id === id;
        });
        if (uncheckedLayer[0]) {
          this.triggerPreviousLayerEndTime(uncheckedLayer[0]);
          this.dequeLayerFromStack(this.layerIdList, uncheckedLayer[0].id)
        }
      }
    });
  }

  //END THE START TIME OF A LAYER
  triggerPreviousLayerEndTime(layerObject) {
    let currentTime = this.setCurrentTimestamp();
    let layerTime = layerObject.time;
    let timeSpent = this.calculateTimeDifference(currentTime, layerTime);
    this.dataPayload.push({
      timeSpent: timeSpent,
      screenId: layerObject.id,
      userId: 7722778
    });
  }

  //REMOVE THE TIMESTAMP ELEMENTS FROM THE ARRAY
  queueLayerIntoTheStack(layersArray, id) {
    let updatedLayersArray = layersArray.filter((object: any, index: any) => {
      return object.id === id;
    });
    this.layerIdList = updatedLayersArray;
  }

  //ADD THE TIMESTAMP ELEMENTS INTO THE ARRAY
  dequeLayerFromStack(layersArray, id) {
    let updatedLayersArray = layersArray.filter((object: any, index: any) => {
      return object.id !== id;
    });
    this.layerIdList = updatedLayersArray;
  }

  //CALCULATE THE TIME DIFF
  calculateTimeDifference(endTime, startTime) {
    let totalHours = endTime.diff(startTime, 'hours');
    let totalMinutes = endTime.diff(startTime, 'minutes');
    let totalSeconds = endTime.diff(startTime, 'seconds');
    let clearMinutes = totalMinutes % 60;
    let clearSeconds = totalSeconds % 60;

    let hours = `${totalHours}`.length == 1 ? "0" + `${totalHours}` : totalHours
    let minutes = `${clearMinutes}`.length == 1 ? "0" + `${clearMinutes}` : clearMinutes;
    let seconds = `${clearSeconds}`.length == 1 ? "0" + `${clearSeconds}` : clearSeconds

    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  //EXTERNAL POPUP TIME CALC.
  timeFromPopupPages() {
    this.datashare.sendCalcuateTimeToHomeJcpPage$.subscribe((time) => {
      if (Object.keys(time).length == 0) {
        return;
      }
      this.dataPayload.push(time);
    });
  }

  //POST CALL TO DB
  sendTrackedData() {
    this.timeFromPopupPages();
    setInterval(() => {
      let selectedLayers = [];
      if (this.layerIdList.length > 0) {
        this.layerIdList.forEach((element) => {
          if (element.type == "other") {
            this.triggerPreviousLayerEndTime(element);
            let totalArrayLength = this.layerIdList.length - 1;
            var ifLastItemIsOther = this.layerIdList.lastIndexOf(element);
            //'OTHER' IS THE ACTIVE PAGE
            if (ifLastItemIsOther == totalArrayLength) {
              return
            }
            else {
              this.dequeLayerFromStack(this.layerIdList, element.id)
            }
          }
          else if (element.type == "checkbox") {
            //'CHECKBOX PAGE' IS THE ACTIVE PAGE
            let layerId = element.id;
            let layerTime = element.time;
            let calculateTime = this.calculateTimeDifference(this.setCurrentTimestamp(), layerTime);
            let layerDetails = {
              timeSpent: calculateTime,
              screenId: layerId,
              userId: 7722778
            }
            selectedLayers.push(layerDetails);
          }
        });

        let data1 = this.dataPayload;
        let data2 = selectedLayers;

        [...data1, ...data2];

        this.resetStackedLayers();
        this.dataPayload = [];
      }
    }, 30000)
  }

  //RESET TIME FOR ACTIVE PAGES
  resetStackedLayers() {
    this.layerIdList.forEach((element) => {
      element.time = this.setCurrentTimestamp();
    });
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  changeIcon() {
    this.isHamburguer = !this.isHamburguer;
  }

  //STRIP TOP BAR MENU CHECK ON OPEN//CLOSE
  styleStripBarMenu() {
    if (this.toggleActive == false) {
      this.refreshMap();
      if ((<HTMLInputElement>document.getElementById("topstrip"))) {
        let stripWidth = window.innerWidth - 30;
        (<HTMLInputElement>document.getElementById("topstrip")).style.width = stripWidth + 'px';
      }
    }
    else {
      setTimeout(() => {
        let stripWidth = (<HTMLInputElement>document.getElementById("angular-app-root")).clientWidth - 30;
        (<HTMLInputElement>document.getElementById("topstrip")).style.width = stripWidth + 'px';
      }, 400);
    }
  }

  //REFRESH MAP ON SIDEMENU ON OPEN/CLOSE
  refreshMap() {
    window.dispatchEvent(new Event('resize'));
  }
}

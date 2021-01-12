import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";
import { BasicAuthInterceptor, ErrorInterceptor } from "./_helpers";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as _ from "lodash";
import { A11yModule } from "@angular/cdk/a11y";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { ClickOutsideDirective } from './_directive/click-outside.directive';
import { CoreModule } from './core/core.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import '@geoman-io/leaflet-geoman-free';
import { SettingsDialogComponent } from './core/components/header/myjcpdropdownpanel/settings-dialog/settings-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Ng5SliderModule } from 'ng5-slider';
import { CapacityComponent } from '../app/modules/components/capacity/capacity.component';
import { ConfigurationComponent } from '../app/modules/components/configuration/configuration.component';
import { GoldenParameterComponent } from './modules/components/properties/golden-parameter/golden-parameter.component';
import { RadioParameterComponent } from './modules/components/properties/radio-parameter/radio-parameter.component';
import { AntennaParameterComponent } from './modules/components/properties/antenna-parameter/antenna-parameter.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OverviewComponent } from './modules/components/properties/overview/overview.component';
import { GeographicalDetailsComponent } from './modules/components/properties/geographical-details/geographical-details.component';
import { InventoryComponent } from './modules/components/properties/inventory/inventory.component';
import { BackhaulComponent } from './modules/components/properties/backhaul/backhaul.component';
import { SiteMilestoneComponent } from './modules/components/properties/site-milestone/site-milestone.component';
import { PowerComponent } from './modules/components/properties/power/power.component';
import { EmsDetailsComponent } from './modules/components/properties/ems-details/ems-details.component';
import { PropertiesComponent } from './modules/components/properties/properties.component';
import { LteAntennaComponent } from './modules/components/properties/inventory/lte-antenna/lte-antenna.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SuccessfulModalComponent } from './core/components/commonPopup/successful-modal/successful-modal.component';
import { QuestionPopupComponent } from './modules/components/capacity/question-popup/question-popup.component';
import { InAppRootOverlayContainer } from './main-modules/in-app-root-overlay-container';
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginJcpThreeComponent,
    ClickOutsideDirective,
    SettingsDialogComponent,
    OverviewComponent,
    GeographicalDetailsComponent,
    InventoryComponent,
    BackhaulComponent,
    SiteMilestoneComponent,
    PowerComponent,
    EmsDetailsComponent,
    AntennaParameterComponent,
    GoldenParameterComponent,
    RadioParameterComponent,
    PropertiesComponent,
    LteAntennaComponent,
    CapacityComponent,
    QuestionPopupComponent,
    ConfigurationComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    LeafletModule,
    CoreModule,
    FlexLayoutModule,
    CarouselModule,
    MDBBootstrapModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgbModule,
    NgxDaterangepickerMd,
    MatFormFieldModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: OverlayContainer, useClass: InAppRootOverlayContainer },
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [
    SuccessfulModalComponent,
    SettingsDialogComponent,
  ]
})
export class AppModule { }

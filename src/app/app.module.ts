import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";
import { BasicAuthInterceptor, ErrorInterceptor } from "./_helpers";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginJcpThreeComponent } from "./login-jcp-three/login-jcp-three.component";
import { HomeJcpThreeComponent } from "./home-jcp-three/home-jcp-three.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import * as _ from "lodash";

//Angular Material Components
import { A11yModule } from "@angular/cdk/a11y";
// import {ClipboardModule} from '@angular/cdk/clipboard';
import { DragDropModule } from "@angular/cdk/drag-drop";
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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
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
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
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
import { SidebarmenuComponent } from "./sidebarmenu/sidebarmenu.component";
import { NavService } from './sidebarmenu/nav.service';
import { MenuListItemComponent } from './sidebarmenu/menu-list-item/menu-list-item.component';
import { TopNavComponent } from './sidebarmenu/top-nav/top-nav.component';
import { MacroComponent } from './layers/sites/macro/macro.component';
import { NavigationSidebarComponent } from './navigation-sidebar/navigation-sidebar.component';
// import { FilterUniquePipe } from './_pipes/filterUnique/filter-unique.pipe';
import { ClickOutsideDirective } from './_directive/click-outside.directive';
import { MyReportsComponent } from './modules/reports/my-reports/my-reports.component';
import { CoreModule } from './core/core.module';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReportsWizardComponent } from './modules/reports/reports-wizard/reports-wizard.component';

import { AngularSlickgridModule } from 'angular-slickgrid';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgGridModule } from 'ag-grid-angular';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginJcpThreeComponent,
    HomeJcpThreeComponent,
    SidebarmenuComponent,
    MenuListItemComponent,
    TopNavComponent,
    MacroComponent,
    NavigationSidebarComponent,
    // FilterUniquePipe,
    ClickOutsideDirective,
    MyReportsComponent,
    ReportsWizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FlexLayoutModule,

    AgGridModule.withComponents([]),
    NgxDaterangepickerMd.forRoot(),
    AngularSlickgridModule.forRoot(),

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    //font
    FontAwesomeModule,

    //Angular meterial
    A11yModule,
    // ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    NavService
  ],
  bootstrap: [AppComponent],
  exports: [HomeJcpThreeComponent]
})
export class AppModule {}

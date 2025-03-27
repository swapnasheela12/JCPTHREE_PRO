import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeJcpThreeRoutingModule } from './home-jcp-three-routing.module';
import { HomeJcpThreeComponent } from "../home-jcp-three/home-jcp-three.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoreModule } from '../core/core.module';
import { A11yModule } from "@angular/cdk/a11y";
import { MatButtonModule } from "@angular/material/button";
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavService } from '../_services/side-nav.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingHomeComponent } from '../home-jcp-three/landing-home/landing-home.component';
import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule } from 'angular-highcharts';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LayersCustComponent } from '../modules/layers-cust/layers-cust.component';
import { AgGridTreeRenderingComponent } from '../modules/components/ag-grid-tree-rendering/ag-grid-tree-rendering.component';
import { AgGridColumnRenderingComponent } from '../modules/components/ag-grid-column-rendering/ag-grid-column-rendering.component';
import { TreeRenderingComponent } from '../modules/components/tree-rendering/tree-rendering.component';
import { ColumnRenderingComponent } from '../modules/components/column-rendering/column-rendering.component';
import { RowRenderingComponent, ModalTemplateComponent } from '../modules/components/row-rendering/row-rendering.component';
import { AgGridRowRenderingComponent } from '../modules/components/ag-grid-row-rendering/ag-grid-row-rendering.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    HomeJcpThreeComponent,
    LandingHomeComponent,
    RowRenderingComponent,
    ColumnRenderingComponent,
    TreeRenderingComponent,
    AgGridColumnRenderingComponent,
    AgGridRowRenderingComponent,
    AgGridTreeRenderingComponent,
    LayersCustComponent,
    ModalTemplateComponent,
    ],
  imports: [
    CommonModule,
    CoreModule,
    HomeJcpThreeRoutingModule,
    ChartModule,
    HighchartsChartModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    FontAwesomeModule,
    A11yModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
    ], providers: [
    SideNavService,
  ], exports: [
    HomeJcpThreeComponent,
  ],
  entryComponents: [
    ModalTemplateComponent
  ]
  
})
export class HomeJcpThreeModule { }

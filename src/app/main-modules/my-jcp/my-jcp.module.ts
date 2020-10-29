import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoreModule } from '../../core/core.module';
import { A11yModule } from "@angular/cdk/a11y";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerformanceComponent } from './template-card-view/performance/performance.component';
import { MyJcpComponent } from './my-jcp.component';
import { PlanningComponent } from './template-card-view/planning/planning.component';
import { CustomerExperienceComponent } from './template-card-view/customer-experience/customer-experience.component';
import { BackhaulViolatorsComponent } from './template-card-view/backhaul-violators/backhaul-violators.component';
import { AlarmsComponent } from './template-card-view/alarms/alarms.component';
import { WorkordersComponent } from './template-card-view/workorders/workorders.component';
import { MyJcpRoutingModule } from './my-jcp-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    MyJcpComponent,
    WorkordersComponent,
    AlarmsComponent,
    BackhaulViolatorsComponent,
    CustomerExperienceComponent,
    PlanningComponent,
    MyJcpComponent,
    PerformanceComponent
    ],
  imports: [
    CommonModule,
    CoreModule,
    DragDropModule,
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
    NgbModule,
    MyJcpRoutingModule
    ], providers: [
  ], exports: [
    MyJcpComponent
  ],
  entryComponents: [
  ]
  
})

export class MyJcpModule { }

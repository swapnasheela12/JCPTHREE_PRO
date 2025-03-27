import { AlarmSummaryComponent } from './alarm-summary/alarm-summary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveAlarmComponent } from './active-alarm/active-alarm.component';
import { ActiveLibraryComponent } from './active-library/active-library.component';
import { AddAlarmComponent } from './add-alarm/add-alarm.component';
//import { AddAlarmComponent } from './add-alarm/add-alarm.component';


const routes: Routes = [

  { path: "Active-Alarm", component: ActiveAlarmComponent },
  { path: "Alarm-Library", component: ActiveLibraryComponent },
  { path: "Alarm-Summary", component: AlarmSummaryComponent },
  { path: "Add-Alarm", component: AddAlarmComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaultManagementRoutingModule { }

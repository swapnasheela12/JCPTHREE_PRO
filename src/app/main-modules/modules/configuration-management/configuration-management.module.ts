import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationManagementRoutingModule } from './configuration-management-routing.module';
import { SamsungRqaSchedulingComponent } from './config-change/rqa-scheduling/samsung-rqa-scheduling/samsung-rqa-scheduling.component';


@NgModule({
  declarations: [SamsungRqaSchedulingComponent],
  imports: [
    CommonModule,
    ConfigurationManagementRoutingModule
  ]
})
export class ConfigurationManagementModule { }

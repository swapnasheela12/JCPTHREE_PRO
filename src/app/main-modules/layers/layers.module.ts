import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayersRoutingModule } from './layers-routing.module';
import { MacroComponent } from './sites/outdoor/macro/macro.component';
import { LayersComponent } from './layers.component';


@NgModule({
  declarations: [MacroComponent, LayersComponent],
  imports: [
    CommonModule,
    LayersRoutingModule
  ],
  exports: [
    LayersComponent,
    MacroComponent
  ], entryComponents: [
    // SuccessfulComponent
  ]
})
export class LayersModule { }

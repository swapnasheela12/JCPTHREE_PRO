import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayersComponent } from './layers.component';
import { MacroComponent } from './sites/outdoor/macro/macro.component';


const routes: Routes = [
  {
    path:"Macro",component:MacroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayersRoutingModule { }

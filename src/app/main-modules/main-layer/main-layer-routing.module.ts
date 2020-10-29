import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayerComponent } from '../main-layer/main-layer.component';

const routes: Routes = [
  { path: "", component: MainLayerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayerRoutingModule { }

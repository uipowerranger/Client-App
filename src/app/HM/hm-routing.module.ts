import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HMComponent } from './hm.component';

const routes: Routes = [
  {
    path: '',
    component: HMComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HMRoutingModule { }

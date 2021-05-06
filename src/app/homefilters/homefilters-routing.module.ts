import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeFiltersComponent } from './homefilters.component';

const routes: Routes = [
  {
    path: '',
    component: HomeFiltersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeFilterRoutingModule { }

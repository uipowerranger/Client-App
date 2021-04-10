import { StocksComponent } from './stocks/stocks/stocks.component';
import { InquiriesdataComponent } from './inquiriesdata/inquiriesdata.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'inquiry',
    component: InquiriesdataComponent
  },
  {
    path: 'stocks',
    component: StocksComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

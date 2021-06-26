import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftBoxComponent } from './giftbox.component';


const routes: Routes = [
  {
    path: '',
    component: GiftBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftboxRoutingModule { }

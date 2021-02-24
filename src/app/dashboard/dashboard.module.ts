import { MatFormFieldModule } from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGaugeModule } from 'ngx-gauge';
import { OrdercountComponent } from './ordercount/ordercount.component';
import { UserscountComponent } from './userscount/userscount.component';
import { RevenucountComponent } from './revenucount/revenucount.component';
import { OrderstableComponent } from './main/orderstable/orderstable.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { EnquycountComponent } from './main/enquycount/enquycount.component';
import { InquiriesdataComponent } from './inquiriesdata/inquiriesdata.component';
@NgModule({
  declarations: [MainComponent, OrdercountComponent, UserscountComponent, RevenucountComponent, OrderstableComponent, EnquycountComponent, InquiriesdataComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatTabsModule,
    NgxGaugeModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule
  ],
})
export class DashboardModule { }

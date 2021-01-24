import { RegadminComponent } from './regadmin/regadmin.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "regadmin",
    component: RegadminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

import { Page404Component } from "./authentication/page404/page404.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guard/auth.guard";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "inquiry/inquiry",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "advance-table",
        loadChildren: () =>
          import("./advance-table/advance-table.module").then(
            (m) => m.AdvanceTableModule
          ),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: "sub_categories",
        loadChildren: () =>
          import("./sub_categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.module").then((m) => m.ProductsModule),
      },
      {
        path: "admins",
        loadChildren: () =>
          import("./add_admins/products.module").then((m) => m.AdminsModule),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./add_users/products.module").then((m) => m.UsersModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./orders/products.module").then((m) => m.OrdersModule),
      },
      {
        path: "carousel",
        loadChildren: () =>
          import("./carousel/products.module").then((m) => m.CauroselModule),
      },
      {
        path: "stocks",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "states",
        loadChildren: () =>
          import("./states/categories.module").then((m) => m.StatesModule),
      },
      {
        path: "homefilter",
        loadChildren: () =>
          import("./HM/HM.module").then((m) => m.HMModule),
      },
      {
        path: "postcodes",
        loadChildren: () =>
          import("./postcodes/categories.module").then(
            (m) => m.PostcodesModule
          ),
      },
      {
        path: "vegbox1",
        loadChildren: () =>
          import("./giftbox/giftbox.module").then(
            (m) => m.GiftBoxModule
          ),
      },
      {
        path: "vegbox2",
        loadChildren: () =>
          import("./vegbox/vegbox.module").then(
            (m) => m.VegboxModule
          ),
      },
      {
        path: "calendar",
        loadChildren: () =>
          import("./calendar/calendar.module").then((m) => m.CalendarsModule),
      },
      {
        path: "task",
        loadChildren: () =>
          import("./task/task.module").then((m) => m.TaskModule),
      },
      {
        path: "contacts",
        loadChildren: () =>
          import("./contacts/contacts.module").then((m) => m.ContactsModule),
      },
      {
        path: "email",
        loadChildren: () =>
          import("./email/email.module").then((m) => m.EmailModule),
      },
      {
        path: "apps",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "widget",
        loadChildren: () =>
          import("./widget/widget.module").then((m) => m.WidgetModule),
      },
      {
        path: "ui",
        loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "media",
        loadChildren: () =>
          import("./media/media.module").then((m) => m.MediaModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "timeline",
        loadChildren: () =>
          import("./timeline/timeline.module").then((m) => m.TimelineModule),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "extra-pages",
        loadChildren: () =>
          import("./extra-pages/extra-pages.module").then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "multilevel",
        loadChildren: () =>
          import("./multilevel/multilevel.module").then(
            (m) => m.MultilevelModule
          ),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

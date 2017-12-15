import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Components} from "./export/components/export-components";

const routes: Routes = [
  {path: '', redirectTo: '/offers', pathMatch: 'full'},
  {path: 'register', component: Components.RegisterPageComponent},
  {path: 'login', component: Components.LoginPageComponent},
  {path: 'offers', component: Components.CatalogComponent},
  {path: 'offers/add', component: Components.AddOfferComponent},
  {path: 'offers/edit/:id', component: Components.EditOfferComponent},
  {path: 'offers/delete/:id', component: Components.DeleteOfferComponent},
  {path: 'account', component: Components.AccountComponent},

  {path: 'bargains', component: Components.BargainsComponent}, // to do
  {path: '**', component: Components.NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

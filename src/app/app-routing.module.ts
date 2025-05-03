import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechhubAboutComponent } from './techhub-about/techhub-about.component';
import {TechhubProductsComponent} from './techhub-products/techhub-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: TechhubProductsComponent },
  { path: 'about', component: TechhubAboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

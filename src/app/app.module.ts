import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TechhubAboutComponent } from './techhub-about/techhub-about.component';
import { TechhubProductsComponent } from './techhub-products/techhub-products.component';
import { InputIntegerComponent } from './input-integer/input-integer.component';
import { provideHttpClient } from '@angular/common/http';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ShoppingCartComponent,
    TechhubAboutComponent,
    TechhubProductsComponent,
    InputIntegerComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

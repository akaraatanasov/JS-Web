import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; 
 
import { DubCheck } from './validateName';
import { PasswordValidation } from './validatePass';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DubCheck, PasswordValidation],
  bootstrap: [AppComponent]
})
export class AppModule { }

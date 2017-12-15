import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from '../.././app-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';

let materialModules = [MatCheckboxModule, MatToolbarModule];

export const ModulesExport = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  ...materialModules
];

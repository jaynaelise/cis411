import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ArtService } from './services/art.service';
import { FilterFormComponent } from './home/filter-form/filter-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    FilterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ArtService
  ],
  bootstrap: [AppComponent, HomeComponent, NavMenuComponent, FilterFormComponent],
  entryComponents: [FilterFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

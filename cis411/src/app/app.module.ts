import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OpenSearchComponent } from './opensearch/opensearch.component';
import { MaterialModule } from './material/material.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ArtService } from './services/art.service';
import { FilterFormComponent } from './opensearch/filter-form/filter-form.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { ArtPageComponent } from './art-page/art-page.component';
import { ArtDetailComponent } from './art-page/art-detail/art-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesComponent } from './features/features.component';
import { BigfeatureComponent } from './bigfeature/bigfeature.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenSearchComponent,
    NavMenuComponent,
    FilterFormComponent,
    ArtPageComponent,
      ArtDetailComponent,
      HeaderComponent,
      FooterComponent,
      FeaturesComponent,
      BigfeatureComponent,
      HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    ArtService,
    FormBuilder
  ],
  bootstrap: [AppComponent, OpenSearchComponent, NavMenuComponent, FilterFormComponent, ArtPageComponent, ArtDetailComponent],
  entryComponents: [FilterFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

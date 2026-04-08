import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UrlShortenerModule } from './core/shorten-url.module';

import { AppRoutingModule } from './app-routing.module';

@NgModule({

  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    UrlShortenerModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]

})
export class AppModule {}

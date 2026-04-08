import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UrlFormComponent } from './components/url-form/url-form.component';

@NgModule({

  declarations: [
    UrlFormComponent
  ],

  imports: [
    CommonModule,
    FormsModule
  ],

  exports: [
    UrlFormComponent
  ]

})
export class UrlShortenerModule {}

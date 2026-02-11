import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UrlFormComponent } from './core/components/url-form/url-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UrlFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

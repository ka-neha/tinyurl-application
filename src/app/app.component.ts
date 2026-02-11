import { Component } from '@angular/core';
import { UrlFormComponent } from './core/components/url-form/url-form.component';

@Component({
  selector: 'app-root',
  imports: [UrlFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tiny URL Application';
}

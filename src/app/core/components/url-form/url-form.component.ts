import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { UrlService } from '../../services/url.service';
import { ShortUrl } from '../../models/short-url.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-url-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css',
})
export class UrlFormComponent implements OnInit, OnDestroy {
  constructor(private service: UrlService) {}

  urls: ShortUrl[] = [];
  searchText: string = '';
  filteredUrls: any[] = [];
  shortUrl: string = '';
  refreshSubscription?: Subscription;
  public urlData = {
    originalUrl: '',
    isPrivate: false,
  };

  createShortUrl() {
    this.service.create(this.urlData).subscribe({
      next: (res: any) => {
        this.shortUrl = `${environment.apiUrl.replace('/api/shorturls','')}/${res.shortCode}`;
        this.urls.unshift(res);
        this.search();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.load();
    // Auto-refresh every 5 seconds to show updated click counts
    this.refreshSubscription = interval(5000).subscribe(() => {
      this.load();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  search() {
    if (!this.searchText.trim()) {
      this.filteredUrls = this.urls;
      return;
    }
    const text = this.searchText.toLowerCase();
    this.filteredUrls = this.urls.filter(
      (url) =>
        url.originalUrl.toLowerCase().includes(text) ||
        url.shortCode.toLowerCase().includes(text),
    );
  }

  load() {
    this.service.getAll().subscribe((res) => {
      this.urls = res;
      this.search(); // Reapply filter after loading
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  copy(code: string) {
    navigator.clipboard.writeText(`${environment.apiUrl.replace('/api/shorturls','')}/${code}`);
  }

  openUrl(url: ShortUrl) {
    this.service.incrementClicks(url.id).subscribe({
      next: () => {
        console.log(
          `[CLICK] Successfully incremented clicks for ID: ${url.id}`,
        );
      },
      error: (err) => {
        console.error(
          `[CLICK] Error incrementing clicks for ID ${url.id}:`,
          err,
        );
      },
    });
    // Link href will handle navigation
  }
  getShortUrl(code: string): string {
    return `${environment.apiUrl.replace('/api/shorturls','')}/${code}`;
  }
}

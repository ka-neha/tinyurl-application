import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortUrl } from '../models/short-url.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

 private apiBase = environment.apiUrl;
  constructor(private http: HttpClient) {}

  create(data: Partial<ShortUrl>): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(this.apiBase, data);
  }

  getAll(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(this.apiBase);
  }

  search(term: string): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(`${this.apiBase}/search/${term}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${id}`);
  }

  incrementClicks(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiBase}/${id}/click`, {});
  }

}

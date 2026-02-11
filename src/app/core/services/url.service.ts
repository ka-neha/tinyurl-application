import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortUrl } from '../models/short-url.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private api = 'https://localhost:5001/api/shorturls';

  constructor(private http: HttpClient) {}

  create(data: Partial<ShortUrl>): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(this.api, data);
  }

  getAll(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(this.api);
  }

  search(term: string): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(`${this.api}/search/${term}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  incrementClicks(id: number): Observable<void> {
    return this.http.post<void>(`${this.api}/${id}/click`, {});
  }

}

export interface ShortUrl {
  id: number;
  originalUrl: string;
  shortCode: string;
  isPrivate: boolean;
  totalClicks: number;
}
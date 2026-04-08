namespace UrlShortener.Api.Models
{
    public class ShortUrl
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; } = string.Empty;
        public string ShortCode { get; set; } = string.Empty;
        public bool IsPrivate { get; set; }
        public int TotalClicks { get; set; } = 0;
    }
}

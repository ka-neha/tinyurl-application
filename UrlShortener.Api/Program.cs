using Microsoft.EntityFrameworkCore;
using UrlShortener.Api.Data;
using UrlShortener.Api.Models;

var builder = WebApplication.CreateBuilder(args);

/*** Load Secret Token from Environment or AppSettings */
var secretToken = builder.Configuration["secretToken"];

/*** Database Configuration (SQLite) */
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=shorturls.db"));


/*** Swagger */
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*** CORS for Angular */
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            .withOrigins("http://localhost:4200", "https://tinyurl-ui-rldy.onrender.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();


/*** Middleware setting */
app.UseCors("AllowAngular");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();


/*** Utility: Generate Short Code */
string GenerateShortCode()
{
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var random = new Random();

    return new string(Enumerable.Repeat(chars, 6)
        .Select(s => s[random.Next(s.Length)]).ToArray());
}


/***CREATE SHORT URL*/
app.MapPost("/api/shorturls", async (ShortUrl request, AppDbContext db) =>
{
    var code = GenerateShortCode();

    var shortUrl = new ShortUrl
    {
        OriginalUrl = request.OriginalUrl,
        ShortCode = code,
        IsPrivate = request.IsPrivate,
        TotalClicks = 0
    };

    db.ShortUrls.Add(shortUrl);
    await db.SaveChangesAsync();
    return Results.Ok(shortUrl);
});

/*** GET ALL URLS */
app.MapGet("/api/shorturls", async (AppDbContext db) =>
{
    return await db.ShortUrls
        .Select(x => new
        {
            x.Id,
            x.OriginalUrl,
            x.ShortCode,
            x.TotalClicks,
            x.IsPrivate
        })
        .ToListAsync();
});

/*** GET URL BY CODE */
app.MapGet("/api/shorturls/{code}", async (string code, AppDbContext db) =>
{
    var url = await db.ShortUrls.FirstOrDefaultAsync(x => x.ShortCode == code);
    if (url == null) return Results.NotFound();
    return Results.Ok(url);
});

/*** SEARCH URLS */
app.MapGet("/api/shorturls/search/{term}", async (
    string term,
    AppDbContext db) =>
{
    return await db.ShortUrls
        .Where(x => x.OriginalUrl.Contains(term) || x.ShortCode.Contains(term))
        .ToListAsync();
});

/*** INCREMENT CLICK COUNT */
app.MapPost("/api/shorturls/{id}/click", async (int id, AppDbContext db) =>
{
    var url = await db.ShortUrls.FindAsync(id);
    if (url == null)
        return Results.NotFound();

    url.TotalClicks++;
    await db.SaveChangesAsync();
    return Results.Ok();
});

/*** REDIRECT + INCREMENT CLICK COUNT */
app.MapGet("/{code}", async (string code, AppDbContext db) =>
{
    var url = await db.ShortUrls
        .FirstOrDefaultAsync(x => x.ShortCode == code);
    if (url == null)
    {
        return Results.NotFound();
    }
    // Increment TotalClicks
    url.TotalClicks++;
    await db.SaveChangesAsync();
    return Results.Redirect(url.OriginalUrl);
});

/*** DELETE URL */
app.MapDelete("/api/shorturls/{id}", async (int id, AppDbContext db) =>
{
    var url = await db.ShortUrls.FindAsync(id);
    if (url == null)
        return Results.NotFound();
    db.ShortUrls.Remove(url);
    await db.SaveChangesAsync();
    return Results.Ok();
});

/*** Run App */

app.MapGet("/", () => "TinyURL API is running successfully!");
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");

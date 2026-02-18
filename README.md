# TinyURL Application

A full-stack URL shortener application built using **Angular 19** (frontend) and **.NET 8 Minimal API with Entity Framework Core** (backend).
This application allows users to:

* Create short URLs
* Redirect to original URLs using short code
* Track total click count
* Search URLs
* Delete URLs
* Automatically increment click count on access

---

# Architecture

```
Angular 19 (Frontend)
   ↓
.NET 8 Minimal API (Backend)
   ↓
SQLite / Azure SQL Database -- As of now handling using SQLite
```

---

# Prerequisites

Tools installed:

* Node.js (v18+)
* Angular CLI (v19+)
* .NET SDK 8
* Git

Verify installation:

```bash
node -v
ng version
dotnet --version
git --version
```

---

# Project Structure

```
tinyurl-application/
│
├── tinyurl-application/        # Angular frontend
│
├── UrlShortener.Api/           # .NET backend
│   ├── Program.cs
│   ├── Models/
│   ├── Data/
│   ├── Migrations/
│   └── appsettings.json
│
└── README.md
```

---

# Running the Backend (.NET API)

Navigate to backend folder:

```bash
cd UrlShortener.Api
```

Restore dependencies:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

Backend will run on:

```
https://localhost:5001
```

Swagger UI:

```
https://localhost:5001/swagger
```

---

# Running the Frontend (Angular)

Navigate to frontend folder:

```bash
cd tinyurl-application
```

Install dependencies:

```bash
npm install
```

Run Angular app:

```bash
ng serve
```

Open browser:

```
http://localhost:4200
```
https://tinyurl-ui-rldy.onrender.com/
---

# How it Works

1. User enters original URL
2. Backend generates unique short code
3. Short URL is created and get reflected in the table:

```
https://localhost:5001/{shortCode}
```
https://tinyurl-application.onrender.com/

4. When opened:

   * Click count increments
   * User redirected to original URL

---

# API Endpoints
### Create short URL
POST /api/shorturls
### Get all URLs
GET /api/shorturls
### Redirect and increment click count
GET /{shortCode}
### Delete URL
DELETE /api/shorturls/{id}

---

# Database
Default: SQLite
File: shorturls.db
```

Can be switched to Azure SQL via `appsettings.json`.

---

# Build for Production

Frontend:

```bash
ng build --configuration production
```

Backend:

```bash
dotnet publish -c Release
```

---

# CI/CD
Supports deployment using:

* GitHub Actions
* Render App Service

---

# Features Implemented

* URL shortening
* Click tracking
* Redirect functionality
* Search URLs
* Delete URLs
* REST API with Swagger
* Angular standalone architecture
* Entity Framework Core with migrations

---
Project Structure-----------------------------
tinyurl-application/
│
├── tinyurl-application/        # Angular frontend
│   |─ src/
│       |── app/core
│       |    ├── services/       # API service
│       |    |── components/     # Component handling URL creation and table display
        |    |── models/         # interface
│       |── environments/   # environment.ts and environment.prod.ts
│
├── UrlShortener.Api/           # .NET backend
│   ├── Program.cs
│   ├── Models/
│   ├── Data/
│   ├── Migrations/
│   └── appsettings.json
│
└── README.md

# Author -- K A Neha

Developed as part of TinyURL full-stack application assignment using Angular and .NET.

---

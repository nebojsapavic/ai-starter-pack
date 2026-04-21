# AI Starter Pack – Full-Stack Course Platform

Besplatan online kurs o veštačkoj inteligenciji kroz 7 modula sa kvizovima, praćenjem napretka i digitalnim sertifikatom.

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: NeDB (embedded, file-based — nema potrebe za eksternim DB serverom)
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Frontend**: Vanilla JS SPA (single-page app, nema frameworka)

## Pokretanje

### 1. Instaliraj dependencies

```bash
npm install
```

### 2. Konfiguracija

Otvori `.env` i promeni `JWT_SECRET` u produkciji:

```
PORT=3000
JWT_SECRET=tvoj-tajni-kljuc-ovde
```

### 3. Pokretanje

```bash
npm start
```

Otvori browser na: http://localhost:3000

## Struktura projekta

```
aistarterpack/
├── server.js              # Express server (entry point)
├── .env                   # Environment varijable
├── package.json
├── data/                  # NeDB fajlovi (automatski se kreiraju)
│   ├── users.db
│   ├── progress.db
│   └── quiz_results.db
├── server/
│   ├── db.js              # Database konekcija
│   └── middleware.js      # JWT auth middleware
├── routes/
│   ├── auth.js            # POST /api/auth/register, /login, GET /me
│   └── course.js          # GET/POST /api/course/progress, /lesson/complete, /quiz/submit, /certificate
└── public/                # Frontend (serviran kao static)
    ├── index.html
    ├── img/               # Slike (head.png, world.png, book.png, logo.svg)
    ├── css/style.css
    └── js/
        ├── data.js        # Sav sadržaj kursa (7 modula × 3 lekcije)
        ├── api.js         # Frontend API klijent
        └── app.js         # SPA router + rendereri za sve stranice
```

## API Endpointi

### Auth
| Method | URL | Opis |
|--------|-----|------|
| POST | /api/auth/register | Registracija novog korisnika |
| POST | /api/auth/login | Prijava i dobijanje JWT tokena |
| GET | /api/auth/me | Podaci ulogovanog korisnika |

### Course (zahteva JWT token)
| Method | URL | Opis |
|--------|-----|------|
| GET | /api/course/progress | Kompletan napredak korisnika |
| POST | /api/course/lesson/complete | Označi lekciju kao završenu |
| POST | /api/course/quiz/submit | Predaj kviz, dobij rezultate |
| GET | /api/course/certificate | Dobij podatke za sertifikat (samo ako je kurs završen) |

## Funkcionalnosti

- ✅ Registracija i prijava sa JWT autentifikacijom
- ✅ 7 modula × 3 lekcije (21 lekcija ukupno) sa punim sadržajem
- ✅ Interaktivni kvizovi (5 pitanja po modulu = 35 ukupno)
- ✅ Objašnjenja za svaki odgovor (tačan i netačan)
- ✅ Praćenje napretka po lekcijama i kvizovima
- ✅ Dashboard sa statistikama
- ✅ Sertifikat (dostupan po završetku svih 7 modula sa 40%+ na svakom kvifu)
- ✅ Štampanje/PDF sertifikata

## Produkcijsko deployovanje

Za deployment na server (npr. Ubuntu VPS):

```bash
# Instaliraj PM2
npm install -g pm2

# Pokretanje
pm2 start server.js --name "ai-starter-pack"
pm2 save
pm2 startup

# Nginx reverse proxy na port 3000
```

Promeni `JWT_SECRET` u `.env` u nešto sigurno pre produkcije!

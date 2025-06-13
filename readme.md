
# .NET WebAPI + React alkalmazás blogposztok kezelésére.

## Felhasznált technológiák:

 - Backend: ASP.NET Core Web API (.NET 8.0)
 - Frontend: React + Vite
 - Adatbázis: MySQL
 - Hitelesítés: JWT + ASP.NET Core Identity

## Projekt telepítése

1.Github repo klónozása

Backend telepítése és elindítása

```bash
  cd Backend
  dotnet restore
  dotnet ef database update
  dotnet run
```

Frontend telepítése és elindítása
```bash
  cd Frontend
  npm i
  npm run dev
```

A fejlesztői oldal url címe: http://localhost:5173
## Védve vannak némely api enpointok:

- Blog poszt létrehozása
- Blog poszt törlés
- Blog poszt szerkesztése
## Bejelentkezés és hitelesítés

- A JWT tokent a localStorage tárolja.
- Minden védett kéréshez ezt a tokent küldi az alkalmazás a Bearer headerben.
- Bejelentkezés után elérhető:
    - A JWT token
    - felhasználónév
## A nem bejelentkezett felhasználó jogai:

- Regisztrálhat
- Bejelentkezhet
- Elérheti a feltöltött összes blog bejegyzést
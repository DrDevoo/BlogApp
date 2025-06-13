.NET WebAPI + React alkalmazás blogposztok kezelésére.

Felhasznált technológiák:
-Backend: ASP.NET Core Web API (.NET 8.0)
-Frontend: React + Vite
-Adatbázis: MySQL
-Hitelesítés: JWT + ASP.NET Core Identity

Projekt használata:
1. Github repo klónozása
2. cd Backend
    -dotnet restore
    -dotnet ef database update
    -dotnet run
3. cd Frontend
    -npm i
    -npm run dev

A fejlesztői oldal url címe: http://localhost:5173

Bejelentkezés és hitelesítés
-A JWT tokent a localStorage tárolja.
-Minden védett kéréshez ezt a tokent küldi az alkalmazás a Bearer headerben.
-Bejelentkezés után elérhető:
    -A JWT token
    -felhasználónév

Védve vannak némely api enpointok:
-Blog poszt létrehozása
-Blog poszt törlés
-Blog poszt szerkesztése

A nem bejelentkezett felhasnáló:
-Regisztrálhat
-Bejelentkezhet
-Elérheti a feltöltött összes blog bejegyzést
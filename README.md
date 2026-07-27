# CAFE DEPO — web

Web kavárny CAFE DEPO na turnovském nádraží. Next.js (App Router),
TypeScript, Tailwind CSS v4. Jazyky: čeština (výchozí) a angličtina,
struktura připravená na doplnění němčiny.

---

## 1) Jak to funguje — přehled

- Veřejný web: `/`, `/menu`, `/o-nas`, `/kontakt` + GDPR stránky.
- Denní obědové menu se nezveřejňuje na webu — web odkazuje na Facebook
  (aktuální denní menu) a menicka.cz (menu bez přihlášení). Stránka `/menu`
  obsahuje jen tyto odkazy, stálou nabídku a otevírací dobu.

---

## 2) Nastavení pro vývojáře / deploy na Vercel

### 2.1 Instalace projektu

```bash
npm install
```

### 2.2 Proměnné prostředí

Vzor je v `.env.example`. Jediná proměnná je `NEXT_PUBLIC_SITE_URL`
(veřejná URL webu pro sitemapu, JSON-LD a sdílení na sociálních sítích).
Bez nastavení se na Vercelu automaticky použije produkční doména projektu,
lokálně `http://localhost:3000`.

```bash
cp .env.example .env.local
npm run dev
```

Web poběží na http://localhost:3000.

### 2.3 Build

```bash
npm run build
```

---

## 3) Struktura projektu (pro vývojáře)

```
app/[locale]/       veřejné stránky (cs/en přes next-intl)
components/         sdílené UI komponenty
lib/                datové typy a pomocné funkce
messages/cs.json    ) texty webu (next-intl)
messages/en.json    )
public/images/      fotky — zatím placeholdery, viz IMAGES.md
```

Přidání dalšího jazyka (např. němčiny): přidat `"de"` do `i18n/routing.ts`
a vytvořit `messages/de.json` podle vzoru `cs.json`.

---

## 4) Co ještě zbývá dodělat

- Doplnit skutečné fotografie podle `IMAGES.md`.
- Ověřit otevírací dobu u klientky (viz `// TODO: ověřit u klienta`
  v `lib/opening-hours.ts`).
- Doplnit IČO a sídlo do GDPR stránek (`[DOPLNIT: IČO]`, `[DOPLNIT: sídlo]`).
- Nasadit na doménu a nastavit `NEXT_PUBLIC_SITE_URL`.

# CAFE DEPO — web

Web kavárny CAFE DEPO na turnovském nádraží. Next.js (App Router),
TypeScript, Tailwind CSS v4. Jazyky: čeština (výchozí) a angličtina,
struktura připravená na doplnění němčiny.

---

## 1) Jak to funguje — přehled

- Veřejný web: `/`, `/menu`, `/o-nas`, `/kontakt` + GDPR stránky.
- Administrace obědového menu: `/admin` — chráněná heslem, obsluhovatelná z mobilu.
- Polední menu se ukládá do **Vercel Blob** (cloudové úložiště souborů).
  Pokud by úložiště nebylo dostupné, web automaticky zobrazí záložní menu
  ze souboru `data/menu-seed.json`, takže web nikdy nespadne kvůli chybějícímu menu.

---

## 2) Nastavení pro vývojáře / deploy na Vercel

### 2.1 Instalace projektu

```bash
npm install
```

### 2.2 Založení Vercel projektu a Blob store

1. Nainstaluj Vercel CLI: `npm i -g vercel` (pokud ještě nemáš).
2. V kořeni projektu spusť `vercel link` a propoj složku s projektem na Vercelu
   (nebo naimportuj repozitář přímo přes vercel.com → **Add New → Project**).
3. Ve Vercel dashboardu jdi do projektu → **Storage** → **Create Database**
   → zvol **Blob** → pojmenuj store (např. `depo-menu`) → **Create**.
4. Po vytvoření Vercel automaticky přidá proměnnou prostředí
   `BLOB_READ_WRITE_TOKEN` do projektu (Production i Preview). Nic dalšího
   není potřeba nastavovat ručně.
5. Pro lokální vývoj stáhni proměnné příkazem:
   ```bash
   vercel env pull .env.local
   ```

### 2.3 Nastavení hesla do administrace

Ve Vercel dashboardu → **Settings → Environment Variables** přidej:

| Proměnná | Hodnota | Poznámka |
|---|---|---|
| `ADMIN_PASSWORD` | heslo dle vlastního výběru | to, čím se klientka přihlašuje na `/admin` |
| `AUTH_SECRET` | náhodný dlouhý řetězec | podepisuje přihlašovací cookie; vygeneruj např. `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://depocafe.cz` (nebo skutečná doména) | používá se pro sitemapu a sdílení na sociálních sítích |

Po přidání proměnných udělej nový deploy (Vercel → Deployments → **Redeploy**),
aby se proměnné načetly.

Vzor všech proměnných je v souboru `.env.example`.

### 2.4 Lokální vývoj

```bash
cp .env.example .env.local
# doplň ADMIN_PASSWORD a AUTH_SECRET, BLOB_READ_WRITE_TOKEN volitelně
npm run dev
```

Web poběží na http://localhost:3000, administrace na http://localhost:3000/admin.
Bez `BLOB_READ_WRITE_TOKEN` se použije záložní menu z `data/menu-seed.json`
(ukládání nového menu ale bude vyžadovat skutečný Blob token).

### 2.5 Build

```bash
npm run build
```

---

## 3) Návod pro klientku — jak editovat polední menu (krok za krokem)

Menu se edituje z telefonu i z počítače, stejným způsobem.

1. **Otevři stránku** `www.tvoje-doména.cz/admin` (nebo klikni na odkaz
   „Administrace“ dole na webu, v patičce).
2. **Zadej heslo** do políčka a klepni na „Přihlásit se“.
3. Nahoře zvol, jestli upravuješ menu na **„Tento týden“** nebo
   **„Příští týden“** — datumy pondělí až pátku se doplní samy.
4. Pokud chceš navázat na minulé menu (třeba jen změnit pár jídel),
   klepni na **„Zkopírovat minulý týden“** — načte se poslední uložené menu
   a ty ho jen upravíš.
5. U každého dne vyplň:
   - **Polévku** — název, alergeny (čísla oddělená čárkou, např. `1,3,7`) a cenu.
   - **Hlavní jídla** — klepni na **„+ Přidat hlavní jídlo“** pro každé jídlo
     zvlášť (název, alergeny, cena). Jídlo smažeš tlačítkem „Odebrat jídlo“.
6. Dole můžeš napsat **poznámku pro celý týden** (např. „Gramáž a alergeny
   na vyžádání u obsluhy“).
7. Klepni na velké červené tlačítko **„Uložit menu“** dole na stránce.
8. Po uložení se zobrazí náhled, jak bude menu vypadat na webu — zkontroluj ho.
9. Menu je hned vidět na `/menu` a na úvodní stránce (sekce „Dnešní menu“).
10. Po skončení práce klepni nahoře na **„Odhlásit“**.

**Co se stane samo:**
- Dnešní den je na webu automaticky zvýrazněný červeně.
- Když skončí platnost týdne (pátek uplyne), web automaticky zobrazí
  hlášku „MENU NA PŘÍŠTÍ TÝDEN PŘIPRAVUJEME“, dokud nenahraješ nové menu.

**Pokud zapomeneš heslo:** požádej správce webu o změnu proměnné
`ADMIN_PASSWORD` ve Vercel dashboardu.

---

## 4) Struktura projektu (pro vývojáře)

```
app/[locale]/       veřejné stránky (cs/en přes next-intl)
app/admin/          administrace menu (bez jazykových mutací)
app/api/            API: /api/menu, /api/admin/login, /api/admin/logout
components/         sdílené UI komponenty
lib/                datové typy, ukládání menu (Blob), pomocné funkce
data/menu-seed.json záložní menu, když Blob není dostupný
messages/cs.json    ) texty webu (next-intl)
messages/en.json    )
public/images/      fotky — zatím placeholdery, viz IMAGES.md
```

Přidání dalšího jazyka (např. němčiny): přidat `"de"` do `i18n/routing.ts`
a vytvořit `messages/de.json` podle vzoru `cs.json`.

---

## 5) Co ještě zbývá dodělat

- Doplnit skutečné fotografie podle `IMAGES.md`.
- Ověřit otevírací dobu u klientky (viz `// TODO: ověřit u klienta`
  v `lib/opening-hours.ts`).
- Doplnit IČO a sídlo do GDPR stránek (`[DOPLNIT: IČO]`, `[DOPLNIT: sídlo]`).
- Nasadit na doménu a nastavit `NEXT_PUBLIC_SITE_URL`.

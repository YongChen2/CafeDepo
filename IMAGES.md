# Fotky pro CAFE DEPO — seznam k nafocení / nakopírování

✅ = reálná fotka je nasazená na webu (viz `public/images/...`).
⬜ = zatím procedurální SVG placeholder — `components/SmartImage.tsx`
zjišťuje existenci souboru na serveru (`fs.existsSync`, build/render čas,
nikdy v prohlížeči) a bez souboru vykreslí `components/PlaceholderImage.tsx`
(halftone rastr, kompozice podle druhu fotky, diagonální pás
"PLACEHOLDER /// MÍSTO PRO REÁLNOU FOTOGRAFII"). **Výměna za reálnou fotku
= jen nahrát soubor pod stejný název, nula změn v kódu.**

Až budou další fotky k dispozici, ulož je přesně pod tyto názvy do
`public/images/...`. Formát: **WebP**, srovnané na šířku dle doporučení
níže, komprimace cca 75–82 % (použij např. `cwebp -q 82 -resize <šířka> 0`).

## logo/

| Soubor | Rozměr | Stav | Poznámka |
|---|---|---|---|
| `logo/logo.webp` | 1024×1024 | ✅ | Skutečné logo CAFE DEPO — `components/Logo.tsx` ho použije automaticky, pokud soubor existuje (fallback na typografickou verzi, pokud ne) |
| `logo/logo-master.png` | 1024×1024 | ✅ | Zdrojový PNG master loga (pro budoucí přegenerování favicon/ikon) |
| `logo/sestry-01.webp` | 600×600 | ⬜ | Portrét sester Pavly Linkové a Elišky Konejlové — stránka /o-nas |

Favicon (`app/icon.png`) a Apple touch ikona (`app/apple-icon.png`) jsou už
vygenerované ze skutečného loga. OG/Twitter obrázek (`app/[locale]/opengraph-image.tsx`,
`twitter-image.tsx`) je generovaný typograficky přes `next/og` — nepotřebuje fotku.

## exterier/

| Soubor | Rozměr | Stav | Poznámka |
|---|---|---|---|
| `exterier/nadrazi-01.webp` | 1600×1170 | ✅ | Vstup do CAFE DEPO — stránka /o-nas (hero foto, priority) |
| `exterier/terasa-01.webp` | 1200×900 (4:3) | ⬜ | Venkovní terasa — homepage galerie |
| `exterier/terasa-02.webp` | 1200×900 (4:3) | ⬜ | Venkovní terasa, jiný úhel (volitelné) |
| `exterier/nadrazi-noc.webp` | 1600×1067 (3:2) | ⬜ | Budova večer/za tmy (volitelné, pro hero) |

## interier/

| Soubor | Rozměr | Stav | Poznámka |
|---|---|---|---|
| `interier/sal-01.webp` | 1400×815 | ✅ | Hlavní sál kavárny — homepage galerie |
| `interier/bar-01.webp` | 1200×900 (4:3) | ⬜ | Barový pult / kávovar — homepage galerie |
| `interier/detail-01.webp` | 1200×900 (4:3) | ⬜ | Detail interiéru / dekor (nádražní motiv) — homepage galerie |
| `interier/salonek-01.webp` | 1200×800 (3:2) | ⬜ | Salonek v patře — homepage sekce Salonek |
| `interier/salonek-02.webp` | 1200×800 (3:2) | ⬜ | Salonek, jiný úhel (volitelné) |

## jidlo/

| Soubor | Rozměr | Stav | Poznámka |
|---|---|---|---|
| `jidlo/snidane-01.webp` | 1200×900 (4:3) | ⬜ | Vydatná snídaně — sekce Snídaně (homepage) |
| `jidlo/kava-01.webp` | 1200×900 (4:3) | ⬜ | Káva / některý z 15 druhů — sekce Káva (homepage) |
| `jidlo/dort-01.webp` | 1200×1382 | ✅ | Domácí zákusky a dorty + nápoje — sekce Dorty (homepage) |
| `jidlo/dort-02.webp` | 1200×900 (4:3) | ⬜ | Zákusek (volitelné) |
| `jidlo/pivo-01.webp` | 1200×900 (4:3) | ⬜ | Točené pivo Monopol (volitelné) |
| `jidlo/limonada-01.webp` | 1200×900 (4:3) | ⬜ | Domácí limonáda (volitelné) |

## Mapa (kontakt + homepage)

Mapa je řešená jako živý Google Maps iframe (`components/MapEmbed.tsx`),
ne jako statická fotka — žádný soubor tedy není potřeba. Iframe se
načte (lazy) až po souhlasu s cookies.

---

**Zbývá nafotit (povinné, bez volitelných):** 7 fotek
(`terasa-01`, `bar-01`, `detail-01`, `salonek-01`, `snidane-01`, `kava-01`,
`sestry-01`) + volitelně `terasa-02`, `nadrazi-noc`, `salonek-02`, `dort-02`,
`pivo-01`, `limonada-01`.

Po nahrání fotky do `public/images/...` najdi odpovídající
`<PlaceholderImage label="..." />` a nahraď ho `<Image>` z `next/image`
(viz hotové příklady u `nadrazi-01`, `sal-01`, `dort-01` v kódu) v souborech:

- `app/[locale]/page.tsx` (homepage — sekce Snídaně/Káva, galerie, salonek)
- `app/[locale]/o-nas/page.tsx` (portrét sester)

# Fotky pro CAFE DEPO — seznam k nafocení / nakopírování

Než dorazí fotky od klientky, web zobrazuje typografické placeholdery
(`components/PlaceholderImage.tsx`) v barvě `#EAE8E3` s křížkem a popiskem.

Až budou fotky k dispozici, ulož je přesně pod tyto názvy do `public/images/...`
a nahraď příslušný `<PlaceholderImage />` komponentou `<Image>` z `next/image`.
Formát: **WebP**, srovnané na šířku dle doporučení níže, komprimace cca 75–80 %.

## logo/

| Soubor | Rozměr | Poznámka |
|---|---|---|
| `logo/logo.svg` | vektor | Finální logo CAFE DEPO — až dorazí, nahradí se `components/Logo.tsx` |
| `logo/sestry-01.webp` | 600×600 | Portrét sester Pavly Linkové a Elišky Konejlové — stránka /o-nas |

## exterier/

| Soubor | Rozměr | Poznámka |
|---|---|---|
| `exterier/nadrazi-01.webp` | 1600×1067 (3:2) | Budova bývalého nádraží / vstup — stránka /o-nas |
| `exterier/terasa-01.webp` | 1200×900 (4:3) | Venkovní terasa — homepage galerie |
| `exterier/terasa-02.webp` | 1200×900 (4:3) | Venkovní terasa, jiný úhel (volitelné) |
| `exterier/nadrazi-noc.webp` | 1600×1067 (3:2) | Budova večer/za tmy (volitelné, pro hero) |

## interier/

| Soubor | Rozměr | Poznámka |
|---|---|---|
| `interier/sal-01.webp` | 1200×900 (4:3) | Hlavní sál kavárny — homepage galerie |
| `interier/bar-01.webp` | 1200×900 (4:3) | Barový pult / kávovar — homepage galerie |
| `interier/detail-01.webp` | 1200×900 (4:3) | Detail interiéru / dekor (nádražní motiv) — homepage galerie |
| `interier/salonek-01.webp` | 1200×800 (3:2) | Salonek v patře — homepage sekce Salonek |
| `interier/salonek-02.webp` | 1200×800 (3:2) | Salonek, jiný úhel (volitelné) |

## jidlo/

| Soubor | Rozměr | Poznámka |
|---|---|---|
| `jidlo/snidane-01.webp` | 1200×900 (4:3) | Vydatná snídaně — sekce Snídaně |
| `jidlo/kava-01.webp` | 1200×900 (4:3) | Káva / některý z 15 druhů — sekce Káva |
| `jidlo/dort-01.webp` | 1200×900 (4:3) | Domácí dort — sekce Dorty |
| `jidlo/dort-02.webp` | 1200×900 (4:3) | Zákusek (volitelné) |
| `jidlo/pivo-01.webp` | 1200×900 (4:3) | Točené pivo Monopol (volitelné) |
| `jidlo/limonada-01.webp` | 1200×900 (4:3) | Domácí limonáda (volitelné) |

## OG / sociální sítě (volitelné, ale doporučené)

| Soubor | Rozměr | Poznámka |
|---|---|---|
| `og-image.webp` | 1200×630 | Obrázek pro sdílení na FB/IG (Open Graph) — umísti do `public/` |

---

**Celkem povinné (bez volitelných):** 9 fotek + logo.
Po nahrání fotek uprav odpovídající `<PlaceholderImage label="..." />` na
`<Image src="/images/..." alt="..." width={…} height={…} />` v souborech:

- `app/[locale]/page.tsx` (homepage — galerie, salonek, mapa)
- `app/[locale]/o-nas/page.tsx` (budova, sestry)
- `app/[locale]/kontakt/page.tsx` (mapa)

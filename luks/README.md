# Defibrillatoren LUKS-Einzugsgebiet – Auswertung

Ein Reporting-Tool von [defikarte.ch](https://defikarte.ch) zur Auswertung der Defibrillator-Daten im Einzugsgebiet des **Luzerner Kantonsspitals (LUKS)** aus OpenStreetMap.

---

## Inhalt

| Datei | Beschreibung |
|---|---|
| `defi_report_luks.html` | Standalone Web-App für LU, UR, NW und OW |

---

## LUKS-Einzugsgebiet: 4 Kantone

Das Tool lädt alle vier GeoJSON-Dateien **parallel** und stellt sie zusammen dar:

| Kanton | Kürzel | GeoJSON-Datei |
|---|---|---|
| Luzern | LU | `defis_kt_lu.geojson` |
| Uri | UR | `defis_kt_ur.geojson` |
| Nidwalden | NW | `defis_kt_nw.geojson` |
| Obwalden | OW | `defis_kt_ow.geojson` |

---

## Tab-Navigation

Die App bietet **5 Tabs**:

| Tab | Inhalt |
|---|---|
| Alle Kantone | Gesamtübersicht mit farbigem Kanton-Badge |
| Luzern | Nur LU-Gemeinden |
| Uri | Nur UR-Gemeinden |
| Nidwalden | Nur NW-Gemeinden |
| Obwalden | Nur OW-Gemeinden |

Der **PDF-Export** folgt dem aktiv gewählten Tab. Im Gesamt-Tab enthält das PDF eine zusätzliche Kanton-Spalte.

---

## Hosting

```bash
# Lokal testen
python3 -m http.server 8080
# http://localhost:8080/defi_report_luks.html
```

> **Hinweis:** Beim direkten Öffnen als `file://` kann der GitHub-Datenabruf durch CORS blockiert werden.

---

## Datenquellen

- **Repository:** [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data)
- **Dateien:** `defis_kt_lu.geojson`, `defis_kt_ur.geojson`, `defis_kt_nw.geojson`, `defis_kt_ow.geojson`
- **Ursprung:** OpenStreetMap via Overpass API (täglich aktualisiert)
- **Lizenz:** ODbL (OpenStreetMap-Daten)

---

## Gemeindezuordnung

### Normalisierte Schreibvarianten

| OSM-Wert | Gemeinde | Kanton |
|---|---|---|
| `Luzern LU`, `Lucerne`, `City of Lucerne` | Luzern | LU |
| `Küssnacht`, `Küssnacht a. Rigi` | Küssnacht am Rigi | LU |
| `Escholzmatt`, `Marbach` | Escholzmatt-Marbach | LU |
| `Hergiswil LU` | Hergiswil bei Willisau | LU |
| `Hergiswil NW` | Hergiswil | NW |
| `Altdorf UR`, `Uri` | Altdorf | UR |
| `Stans NW`, `Nidwalden` | Stans | NW |
| `Sarnen OW`, `Obwalden` | Sarnen | OW |
| `Flüeli`, `Ranft`, `Flüeli-Ranft` | Flüeli-Ranft | OW |
| `Engelberg` | Engelberg | OW |

> **Wichtig: Hergiswil** — Dieser Ortsname existiert zweimal: einmal als Gemeinde in NW (am Vierwaldstättersee) und einmal als Hergiswil bei Willisau in LU. Das `NORMALIZE`-Objekt unterscheidet beide über das Kantonskürzel im Tag.

### Bekannte Institutionen

| Operator | Gemeinde | Kanton |
|---|---|---|
| Luzerner Kantonsspital / LUKS | Luzern | LU |
| Kantonsspital Nidwalden | Stans | NW |
| Kantonsspital Obwalden | Sarnen | OW |
| Kantonsspital Uri | Altdorf | UR |
| Universität / Hochschule Luzern | Luzern | LU |
| VBL (Verkehrsbetriebe Luzern) | Luzern | LU |
| Zentralbahn | Luzern | LU |
| Pilatus-Bahnen | Kriens | LU |
| Rigi Bahnen | Küssnacht am Rigi | LU |
| Titlisbahnen / Titlis | Engelberg | OW |

### Neue Varianten nachpflegen

```js
const NORMALIZE = {
  // bestehende Einträge ...
  'neues-dorf lu': 'Neuenkirch',   // Schreibvariante
  'ortsteil xyz':  'Luzern',       // Ortsteil
};
```

---

## Kanton-Badges (Farbcodierung)

| Kanton | Farbe |
|---|---|
| LU (Luzern) | Blau `#e8f0ff / #1a3a8a` |
| UR (Uri) | Orange `#fff0e0 / #8a3a00` |
| NW (Nidwalden) | Rot `#ffeaea / #8a1a1a` |
| OW (Obwalden) | Grün `#f0ffe8 / #1a6a1a` |

---

## Design

Gemäss [defikarte.ch](https://defikarte.ch) Styleguide:

| Element | Wert |
|---|---|
| Primärfarbe | `#97C568` (Hellgrün, Pantone 367 C/U) |
| Sekundärfarbe | `#144430` (Dunkelgrün, Pantone 357 C/U) |
| Schrift | Poppins (Google Fonts) |

---

## Abhängigkeiten (CDN)

| Bibliothek | Version | Verwendung |
|---|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | PDF-Export |
| [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) | 3.8.2 | Tabellen im PDF |
| [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins) | — | Typografie |

---

## Entwicklung

Teil des [defikarte.ch](https://defikarte.ch) Ökosystems von [OpenBrackets](https://github.com/OpenBracketsCH).
Entwickelt mit [Claude](https://claude.ai) (Anthropic).

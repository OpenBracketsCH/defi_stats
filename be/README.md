# Defibrillatoren Kanton Bern – Auswertung

Ein Reporting-Tool von [defikarte.ch](https://defikarte.ch) zur Auswertung der Defibrillator-Daten im Kanton Bern aus OpenStreetMap.

---

## Inhalt

| Datei | Beschreibung |
|---|---|
| `defi_report_be.html` | Standalone Web-App (kein Build-Schritt nötig) |

---

## Web-App (`defi_report_be.html`)

### Features

- **Automatischer Datenabruf** beim Öffnen direkt von [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data) auf GitHub
- **Kennzahlen-Übersicht**: Total Defibrillatoren, 24/7-Erreichbarkeit, Anteil 24/7, Anzahl Gemeinden
- **Sortierbare Tabelle** nach Gemeinde, Anzahl total, Anzahl 24/7, Anteil 24/7
- **Live-Suche** nach Gemeindename
- **PDF-Export** direkt im Browser mit defikarte.ch-Branding
- **Responsives Design** – funktioniert auf Desktop und Mobile
- **Keine Abhängigkeiten** – eine einzige HTML-Datei, kein Server nötig

### Hosting

```bash
# Lokal testen (empfohlen wegen CORS)
python3 -m http.server 8080
# Dann im Browser: http://localhost:8080/defi_report_be.html

# GitHub Pages, Netlify, Vercel – einfach die HTML-Datei deployen
```

> **Hinweis:** Beim direkten Öffnen als `file://` kann der GitHub-Datenabruf durch CORS blockiert werden. Ein lokaler Webserver löst das Problem.

---

## Datenquelle

- **Repository:** [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data)
- **Datei:** `data/json/defis_kt_be.geojson`
- **Ursprung:** OpenStreetMap via Overpass API (täglich aktualisiert durch GitHub Actions)
- **Lizenz:** ODbL (OpenStreetMap-Daten)

---

## Gemeindezuordnung

Da viele OSM-Einträge keine `addr:city`-Tags haben, erfolgt die Zuordnung mehrstufig:

### Stufen

| Priorität | Methode | Beispiel |
|---|---|---|
| 1 | OSM-Tags (`addr:city`, `addr:municipality`, …) | `addr:city=Bern` → Bern |
| 2 | Normalisierung (Schreibvarianten, Ortsteile) | `Biel` → Biel/Bienne |
| 3 | `operator`-Feld mit Gemeinde-Präfix | `Gemeinde Köniz` → Köniz |
| 4 | Bekannte Institutionen | `Inselspital Bern` → Bern |
| 5 | Koordinaten-Fallback | nächste Gemeinde per Distanz |

### Normalisierte Schreibvarianten

| OSM-Wert | Gemeinde |
|---|---|
| `Biel` / `Bienne` | Biel/Bienne |
| `bern` (Kleinschreibung) | Bern |
| `Bern BE` | Bern |
| `Thun BE` | Thun |
| `Wengen` | Lauterbrunnen |
| `Mürren` | Lauterbrunnen |
| `Gstaad` | Saanen |
| `Gwatt` | Thun |

### Bekannte Institutionen

| Operator | Gemeinde |
|---|---|
| Inselspital Bern | Bern |
| Universitätsspital Bern | Bern |
| Universität Bern | Bern |
| Berner Fachhochschule | Bern |
| BernMobil | Bern |
| Flughafen Bern AG / Airport Bern | Belp |
| SBB | Bern |
| PostAuto Schweiz AG | Bern |

### Neue Varianten nachpflegen

Falls nach dem Laden unerwartete Doppeleinträge oder unbekannte Ortsnamen auftauchen:

1. In der Tabelle nach auffälligen Einträgen suchen (z.B. `Bern-Bümpliz`, `Biel` neben `Biel/Bienne`)
2. Im `NORMALIZE`-Objekt im `<script>`-Block ergänzen:
```js
const NORMALIZE = {
  // bestehende Einträge ...
  'bern-bümpliz': 'Bern',   // Ortsteil
  'kehrsatz': 'Kehrsatz',   // ggf. Schreibkorrektur
};
```

---

## Design

Das Tool folgt dem [defikarte.ch](https://defikarte.ch) Styleguide:

| Element | Wert |
|---|---|
| Primärfarbe | `#97C568` (Hellgrün, Pantone 367 C/U) |
| Sekundärfarbe | `#144430` (Dunkelgrün, Pantone 357 C/U) |
| Schrift | Poppins (Google Fonts) |

---

## Abhängigkeiten (CDN, keine Installation)

| Bibliothek | Version | Verwendung |
|---|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | PDF-Export |
| [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) | 3.8.2 | Tabellen im PDF |
| [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins) | — | Typografie |

---

## Entwicklung

Teil des [defikarte.ch](https://defikarte.ch) Ökosystems von [OpenBrackets](https://github.com/OpenBracketsCH).
Entwickelt mit [Claude](https://claude.ai) (Anthropic).

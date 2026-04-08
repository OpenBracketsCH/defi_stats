# Defibrillatoren Basel-Stadt & Basel-Landschaft – Auswertung

Ein Reporting-Tool von [defikarte.ch](https://defikarte.ch) zur Auswertung der Defibrillator-Daten in beiden Basler Kantonen aus OpenStreetMap.

---

## Inhalt

| Datei | Beschreibung |
|---|---|
| `defi_report_bs_bl.html` | Standalone Web-App für BS + BL kombiniert |

---

## Besonderheit: Zwei Kantone in einer App

Die App lädt **beide GeoJSON-Dateien parallel** und stellt sie gemeinsam dar:

| Kanton | GeoJSON-Datei |
|---|---|
| Basel-Stadt (BS) | `defis_kt_bs.geojson` |
| Basel-Landschaft (BL) | `defis_kt_bl.geojson` |

Über die **Tab-Navigation** kann zwischen drei Ansichten gewechselt werden:

- **Beide Kantone** — alle Gemeinden zusammen, mit Kanton-Badge (BS / BL)
- **Basel-Stadt** — nur die 3 Gemeinden Basel, Riehen, Bettingen
- **Basel-Landschaft** — alle 86 BL-Gemeinden

Der **PDF-Export** berücksichtigt den aktiv gewählten Tab — es wird nur der sichtbare Ausschnitt exportiert.

---

## Hosting

```bash
# Lokal testen
python3 -m http.server 8080
# http://localhost:8080/defi_report_bs_bl.html

# GitHub Pages, Netlify, Vercel – einfach die HTML-Datei deployen
```

> **Hinweis:** Beim direkten Öffnen als `file://` kann der GitHub-Datenabruf durch CORS blockiert werden.

---

## Datenquellen

- **Repository:** [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data)
- **Dateien:** `data/json/defis_kt_bs.geojson` und `data/json/defis_kt_bl.geojson`
- **Ursprung:** OpenStreetMap via Overpass API (täglich aktualisiert durch GitHub Actions)
- **Lizenz:** ODbL (OpenStreetMap-Daten)

---

## Gemeindezuordnung

### Basel-Stadt: Gemeinden

Basel-Stadt besteht aus nur **3 Gemeinden**:

| Gemeinde | Besonderheit |
|---|---|
| Basel | Stadtgemeinde mit 19 Stadtteilen |
| Riehen | Gemeinde am Stadtrand |
| Bettingen | Kleinste Einwohnergemeinde der Schweiz |

### Normalisierte Schreibvarianten

Da Basel viele Ortsteile hat, die in OSM als `addr:city` vorkommen, werden diese zusammengeführt:

| OSM-Wert | Gemeinde |
|---|---|
| `Gundeldingen`, `Kleinbasel`, `St. Alban` | Basel |
| `St. Johann`, `Iselin`, `Bachletten` | Basel |
| `Klybeck`, `Matthäus`, `Hirzbrunnen` | Basel |
| `Basel-Stadt`, `City of Basel`, `Basel BS` | Basel |
| `Reinach BL`, `Aesch BL`, `Oberwil BL` | jeweilige BL-Gemeinde |
| `Liestal BL` | Liestal |

### Bekannte Institutionen

| Operator | Gemeinde |
|---|---|
| Universitätsspital Basel / USB | Basel |
| Universität Basel / Uni Basel | Basel |
| Novartis AG | Basel |
| F. Hoffmann-La Roche AG | Basel |
| BVB (Basler Verkehrs-Betriebe) | Basel |
| BLT (Baselland Transport AG) | Liestal |
| Flughafen Basel-Mulhouse / EuroAirport | Basel |
| Messe Basel | Basel |
| Swiss TPH | Basel |

### Neue Varianten nachpflegen

Falls nach dem Laden Doppeleinträge auftauchen:

```js
const NORMALIZE = {
  // bestehende Einträge ...
  'neuer-ortsteil': 'Basel',   // z.B. weiterer Stadtteil
  'neue bl gem. be': 'Reinach', // Schreibvariante
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
| BS-Badge | Blau `#dce8ff / #1a3a7a` |
| BL-Badge | Orange `#fff0d0 / #7a4a00` |

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

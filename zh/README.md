# Defibrillatoren Kanton Zürich – Auswertung

Ein Reporting-Tool von [defikarte.ch](https://defikarte.ch) zur Auswertung der Defibrillator-Daten im Kanton Zürich aus OpenStreetMap.

---

## Inhalt

| Datei | Beschreibung |
|---|---|
| `defi_report_zh.html` | Standalone Web-App (kein Build-Schritt nötig) |
| `defibrillatoren_kanton_zuerich.pdf` | Statischer PDF-Report (zuletzt generiert) |

---

## Web-App (`defi_report_zh.html`)

### Features

- **Automatischer Datenladen** beim Öffnen direkt von [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data) auf GitHub
- **Kennzahlen-Übersicht**: Total Defibrillatoren, 24/7-Erreichbarkeit, Anteil 24/7, Anzahl Gemeinden
- **Sortierbare Tabelle** nach Gemeinde, Anzahl total, Anzahl 24/7, Anteil 24/7
- **Live-Suche** nach Gemeindename
- **PDF-Export** direkt im Browser mit defikarte.ch-Branding
- **Responsives Design** – funktioniert auf Desktop und Mobile
- **Keine Abhängigkeiten** – eine einzige HTML-Datei, kein Server nötig

### Hosting

Die App ist eine vollständige Single-File-HTML-Seite ohne Backend. Sie kann auf jedem statischen Webserver gehostet werden, z.B.:

```bash
# Lokal testen
open defi_report_zh.html

# Mit Python-Webserver
python3 -m http.server 8080

# GitHub Pages, Netlify, Vercel, etc. – einfach die HTML-Datei deployen
```

> **Hinweis:** Beim direkten Öffnen als `file://` im Browser kann der GitHub-Datenabruf durch CORS blockiert werden. Ein lokaler Webserver (z.B. `python3 -m http.server`) löst das Problem.

### Datenfluss

```
GitHub (OpenBracketsCH/defi_data)
  └── data/json/defis_kt_zh.geojson
        │
        ▼
  Browser lädt GeoJSON
        │
        ▼
  Gemeindezuordnung
  ├── 1. OSM-Tags (addr:city, addr:municipality, ...)
  ├── 2. Normalisierung (Schreibvarianten, Ortsteile)
  ├── 3. operator/name-Feld (z.B. "Gemeinde Richterswil")
  ├── 4. Bekannte Institutionen (Flughafen → Kloten, ETH → Zürich, ...)
  └── 5. Koordinaten-Fallback (nächste Gemeinde per Distanz)
        │
        ▼
  Tabelle + Kennzahlen
        │
        ▼
  Optional: PDF-Export
```

---

## Gemeindezuordnung

Da die meisten OSM-Einträge keine `addr:city`-Tags haben, erfolgt die Zuordnung mehrstufig:

### Normalisierung bekannter Schreibvarianten

Folgende OSM-Schreibvarianten werden automatisch auf den kanonischen Gemeindenamen gemappt:

| OSM-Wert | Gemeinde |
|---|---|
| `Pfäffikon ZH` | Pfäffikon |
| `zürich` (Kleinschreibung) | Zürich |
| `Glattbrugg` | Opfikon |
| `Zollikerberg` | Zollikon |
| `Fahrweid` | Weiningen |
| `Wernetshausen` | Hinwil |

### Bekannte Institutionen (operator-Feld)

| Operator | Gemeinde |
|---|---|
| Flughafen Zürich AG | Kloten |
| ETH Zürich | Zürich |
| VBZ | Zürich |
| Zoo Zürich AG | Zürich |
| SR Technics Switzerland Ltd. | Kloten |
| Stadtpolizei Winterthur | Winterthur |
| ... | ... |

### Koordinaten-Fallback

Für alle verbleibenden Einträge ohne verwertbare Tags wird die nächstgelegene Gemeinde anhand der GPS-Koordinaten und approximativer Gemeindezentren bestimmt.

---

## Datenquelle

- **Repository:** [OpenBracketsCH/defi_data](https://github.com/OpenBracketsCH/defi_data)
- **Datei:** `data/json/defis_kt_zh.geojson`
- **Ursprung:** OpenStreetMap via Overpass API (täglich aktualisiert durch GitHub Actions)
- **Lizenz:** ODbL (OpenStreetMap-Daten)

Die Daten werden täglich automatisch durch einen GitHub Actions Workflow aktualisiert. Die Web-App lädt beim Öffnen immer den aktuellen Stand.

---

## Design

Das Tool folgt dem [defikarte.ch](https://defikarte.ch) Styleguide:

| Element | Wert |
|---|---|
| Primärfarbe | `#97C568` (Hellgrün, Pantone 367 C/U) |
| Sekundärfarbe | `#144430` (Dunkelgrün, Pantone 357 C/U) |
| Schrift | Poppins (Google Fonts) |

---

## Entwicklung

Das Tool wurde mit [Claude](https://claude.ai) (Anthropic) entwickelt und ist Teil des [defikarte.ch](https://defikarte.ch) Ökosystems von [OpenBrackets](https://github.com/OpenBracketsCH).

### Abhängigkeiten (CDN, keine Installation)

| Bibliothek | Version | Verwendung |
|---|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | PDF-Export |
| [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) | 3.8.2 | Tabellen im PDF |
| [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins) | – | Typografie |

---

## Weiterentwicklung

Mögliche nächste Schritte:

- [ ] Kantonsauswahl (nicht nur Zürich, sondern alle Kantone)
- [ ] Zeitreihe: Entwicklung der Anzahl Defis über Zeit
- [ ] Karte mit Gemeinden eingefärbt nach Defi-Dichte
- [ ] Vergleich mit Einwohnerzahl (Defis pro 1000 Einwohner)
- [ ] Automatischer PDF-Report via GitHub Actions (täglich/wöchentlich)

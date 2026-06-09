---
layout: tutorial
title: "Ver las ocurrencias sobre un mapa"
description: "Aprende a visualizar las ocurrencias que descargaste del GBIF"
section: datos
order: 12
---

# Tutorial: Visualizar ocurrencias de GBIF sobre un mapa

**Objetivo:**  
Cargar los datos filtrados, transformarlos en objetos espaciales y visualizarlos sobre un mapa de **Chile** con tres alternativas.

---

## 🧩 1) Preparar el entorno

Instala (si hace falta) y carga los paquetes necesarios:

```r
install.packages(c("readr", "dplyr", "sf", "rnaturalearth", "rnaturalearthdata", "ggplot2", "mapview"))
```

```r
library(readr)
library(dplyr)
library(sf)
library(rnaturalearth)
library(rnaturalearthdata)
library(ggplot2)
library(mapview)
```

---

## 📥 2) Leer el archivo ya limpio

> Usamos el archivo *.CSV que preparaste previamente.

```r
datos <- read.csv("datos_filtrados.csv")
head(datos)

# Seleccionamos solo las columnas necesarias para el mapa y sus atributos
datos <- datos %>%
  select(any_of(c(
    "decimalLatitude", "decimalLongitude", "scientificName", "countryCode",
    "eventDate", "basisOfRecord", "institutionCode", "elevation", "recordedBy",
    "datasetName"
  )))

head(datos)
```

Columnas clave esperadas:
- `decimalLatitude`
- `decimalLongitude`
- (opcional) `scientificName`, `basisOfRecord`, `eventDate`, `datasetName`

---

## 🌍 3) Convertir a objeto espacial (`sf`)

```r
ocurrencias_sf <- st_as_sf(
  datos,
  coords = c("decimalLongitude", "decimalLatitude"),
  crs = 4326 # WGS84
)

# Capa de Chile
chile <- ne_countries(country = "Chile", returnclass = "sf")
```

---

## 🗺️ 4) Tres alternativas para mapear en Chile

### Opción 1: Mapa rápido con **base R** (`plot()`)

```r
plot(st_geometry(chile), col = "grey95", border = "grey70", main = "Ocurrencias en Chile (base R)")
plot(st_geometry(ocurrencias_sf), pch = 16, cex = 0.6, col = "red", add = TRUE)
```

> 💡 Sencillo y útil para una vista rápida.

---

### Opción 2: Mapa “bonito” con **ggplot2**

```r
ggplot() +
  geom_sf(data = chile, fill = "grey95", color = "grey70") +
  geom_sf(data = ocurrencias_sf, size = 0.8, alpha = 0.7) +
  coord_sf(expand = FALSE) +
  labs(title = "Ocurrencias en Chile", x = "Longitud", y = "Latitud") +
  theme_minimal()
```

> 💡 Ideal para informes; fácil de personalizar (títulos, leyendas, facetas).

---

### Opción 3: Mapa **interactivo** con `mapview`

```r
mapviewOptions(basemaps = c("OpenStreetMap", "Esri.WorldTopoMap", "CartoDB.Positron"))

mapview(chile, alpha.regions = 0.1, layer.name = "Chile") +
  mapview(
    ocurrencias_sf,
    zcol = NULL,                 # color único (puedes usar "scientificName")
    cex = 2, alpha = 0.7)

```

> 💡 Perfecto para explorar, hacer zoom y consultar atributos con clic.

---

## 🎯 Resumen

| Acción | Resultado |
|:--|:--|
| Leer archivo CSV (`read.csv`) | Datos limpios en R |
| Convertir a `sf` | Puntos espaciales en WGS84 |
| Base R | Vista rápida y ligera |
| ggplot2 | Gráfico de alta calidad para informes |
| mapview | Mapa interactivo para explorar |

---

📘 **Autor:** Ricardo Segovia  
🧩 **Proyecto:** Curso BIODATA-Uruguay — Gestión y modelamiento de datos de biodiversidad  
📅 **Actualizado:** Octubre 2025

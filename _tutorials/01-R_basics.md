---
layout: default
title: "Básicos de R"
description: "Recordatorio de los elementos básicos de R."
section: introduccion
order: 01
---

# Tutorial: Básicos de R — instalar paquetes, cargar librerías y nomenclatura

**Objetivo:**  
Aprender los fundamentos para trabajar con R: instalar paquetes, cargar librerías y comprender la nomenclatura básica (objetos, funciones, argumentos y buenas prácticas de nombres).

---

## 🧰 1) Preparación del entorno (R y RStudio)

- **R**: lenguaje de programación y entorno de cálculo estadístico.  
- **RStudio/Posit** (opcional pero recomendado): IDE que facilita el uso de R.

> Descarga R desde CRAN (busca “CRAN R download” para tu SO) y luego instala RStudio/Posit Desktop.

---

## 📦 2) Instalar paquetes

Los **paquetes** amplían las funcionalidades de R (gráficos, manipulación de datos, mapas, etc.).

### Instalar un paquete
```r
install.packages("tidyverse")
```

### Instalar varios paquetes de una vez
```r
paquetes <- c("dplyr", "ggplot2", "readr", "tidyr")
install.packages(paquetes)
```

### Elegir repositorio (opcional)
```r
options(repos = c(CRAN = "https://cloud.r-project.org"))
install.packages("sf")
```

### Actualizar paquetes
```r
update.packages(ask = FALSE)
```

> 💡 Si el paquete requiere **sistema** (por ej., `sf`, `terra`), instala previamente dependencias del SO (GDAL, GEOS, PROJ). En Ubuntu puedes usar apt, en macOS Homebrew, etc.

---

## 📚 3) Cargar librerías

Para **usar** un paquete en la sesión actual:

```r
library(dplyr)   # carga y lanza error si no existe
require(dplyr)   # intenta cargar; devuelve TRUE/FALSE
```

Carga múltiple y verificación:
```r
pkgs <- c("dplyr", "ggplot2", "readr")
no_instalados <- pkgs[!pkgs %in% installed.packages()[, "Package"]]
if (length(no_instalados)) install.packages(no_instalados)
lapply(pkgs, library, character.only = TRUE)
```

> 🔁 Debes cargar las librerías **cada vez** que inicias una nueva sesión.

---

## ✍️ 4) Nomenclatura básica en R

### 4.1 Objetos y asignación
- Crea **objetos** con `<-` (recomendado) o `=` (evitar para asignar fuera de funciones).
```r
x <- 10          # número
nombre <- "R"    # carácter
es_verdadero <- TRUE  # lógico
```

### 4.2 Tipos y estructuras comunes
- **Atómicos:** `numeric`, `integer`, `character`, `logical`, `factor`
- **Estructuras:** `vector`, `matrix`, `data.frame`, `list`, `tibble`

```r
v <- c(1, 2, 3)                          # vector
m <- matrix(1:6, nrow = 2)               # matriz 2x3
df <- data.frame(a = 1:3, b = c("x","y","z"))  # data.frame
tb <- tibble::tibble(a = 1:3, b = letters[1:3]) # tibble
```

### 4.3 Funciones y argumentos
- Las **funciones** tienen el formato `nombre_funcion(argumento = valor)`.
- Usa `?funcion` o `help("funcion")` para ver la ayuda.

```r
mean(c(1, 2, 3, 4), na.rm = TRUE)
?mean
```

### 4.4 Índices y acceso
```r
v <- c(10, 20, 30)
v[2]           # 20
df$a           # columna 'a' (por nombre)
df[ , "b"]     # columna 'b' como vector
df[1, 2]       # fila 1, col 2
```

### 4.5 Reglas y buenas prácticas de nombres
- Usar **snake_case**: `mi_objeto`, `datos_crudos`, `plot_altura`
- Nombres **descriptivos** y **sin acentos** (evita espacios y tildes)
- Evitar nombres de funciones base: `mean`, `sum`, `df`, `T`, `F`
- Mantener **consistencia**: elige un estilo y úsalo en todo el proyecto

**Ejemplos correctos:**
```r
ruta_datos <- "data/ocurrencias.csv"
n_especies <- 120
promedio_altura <- mean(alturas, na.rm = TRUE)
```

**Ejemplos a evitar:**
```r
mis datos <- "data/archivo.csv"   # espacios
PromedioAltura <- 3.2             # estilo mixto
data <- 1                         # sobreescribe nombre común
```

---

## 🧪 5) Mini‑ejercicios

1. Instala y carga `dplyr` y `readr`.  
2. Crea un objeto `y` con los números del 1 al 5.  
3. Calcula el promedio de `y`.  
4. Crea un `data.frame` con dos columnas: `especie` (carácter) y `altura` (numérica).  
5. Extrae la segunda fila y la columna `altura` de tu `data.frame`.

```r
# Solución sugerida
install.packages(c("dplyr","readr"))
library(dplyr); library(readr)

y <- 1:5
mean(y)

mi_df <- data.frame(
  especie = c("A", "B", "C"),
  altura  = c(10.2, 8.5, 12.1)
)

mi_df[2, "altura"]
```

---

## 🧯 6) Errores comunes y cómo evitarlos

- **“there is no package called …”** → Instala el paquete con `install.packages("...")` y verifica tu conexión/permiso.  
- **“could not find function …”** → Faltó `library(paquete)` o escribiste mal el nombre.  
- **Encoding/caracteres especiales** → Evita tildes y eñes en nombres de objetos y rutas.  
- **Conflictos de funciones** (p. ej., `dplyr::filter` vs `stats::filter`) → usa el **namespace** `paquete::funcion`.

```r
dplyr::filter(mi_df, altura > 9)
stats::filter(1:10, rep(1/3, 3))
```

---

## 🧭 7) Recursos útiles de la sesión

```r
sessionInfo()  # versión de R y paquetes
getwd()        # directorio de trabajo
setwd("ruta/a/tu/proyecto")  # cambiar directorio (opcional)
```

---

## 🎯 Resumen

| Tema | Qué recordar |
|---|---|
| Instalar paquetes | `install.packages("nombre")` |
| Cargar librerías | `library(nombre)` en cada sesión |
| Nomenclatura | `snake_case`, nombres descriptivos, sin acentos |
| Ayuda | `?funcion` y `paquete::funcion` para evitar conflictos |

---

📘 **Autor:** Ricardo Segovia  
🧩 **Proyecto:** Curso BIODATA-Uruguay — Gestión y modelamiento de datos de biodiversidad  
📅 **Actualizado:** Octubre 2025
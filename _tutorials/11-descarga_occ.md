---
layout: tutorial
title: "Crear cuenta GBIF y bajar datos"
description: "Creación de cuenta en GBIF y primera aproximación"
section: datos
order: 11
---

# Tutorial: Crear una cuenta en GBIF y descargar datos de una especie

**Objetivo:**  
Aprender a crear una cuenta en [GBIF.org](https://www.gbif.org/) y descargar datos de ocurrencia de una especie específica, como *Nothofagus pumilio*.

---

## 🪶 1. ¿Qué es GBIF?

El **Global Biodiversity Information Facility (GBIF)** es una red internacional que proporciona acceso libre y abierto a datos sobre biodiversidad de todo el mundo.  
A través de su portal ([www.gbif.org](https://www.gbif.org/)), puedes buscar y descargar registros de ocurrencia, listas de especies y conjuntos de datos publicados por museos, herbarios y proyectos científicos.

---

## 🧑‍💻 2. Crear una cuenta en GBIF

1. Entra al sitio web: [https://www.gbif.org/](https://www.gbif.org/)
2. Haz clic en **"Sign up"** (arriba a la derecha).  
   ![Botón Sign up](https://www.gbif.org/assets/static/images/screenshots/gbif_signup_button.png)
3. Completa el formulario:
   - **Username:** nombre de usuario (sin espacios)
   - **Email address:** tu correo electrónico
   - **Password:** contraseña segura
   - Acepta los términos de uso
4. Revisa tu correo y confirma tu cuenta haciendo clic en el enlace de verificación.

> ✅ Tener una cuenta te permitirá acceder a funciones avanzadas como descargas de datos y publicación de conjuntos de datos.

---

## 🌿 3. Buscar una especie

1. En la barra superior de búsqueda, escribe el nombre científico de la especie:  
   **Nothofagus pumilio** (o la que prefieras)
2. Haz clic en el resultado correspondiente.
3. Se abrirá la **página de la especie**, con información taxonómica, mapa de distribución y enlaces a los registros de ocurrencia.

![Página de especie](https://www.gbif.org/assets/static/images/screenshots/gbif_species_page.png)

---

## 📥 4. Descargar datos de ocurrencia

1. Dentro de la página de la especie, selecciona la pestaña **“Occurrences”**.  
2. Puedes aplicar filtros antes de descargar:
   - País: `Chile`
   - Tipo de registro: `Preserved specimen`, `Human observation`, etc.
3. Haz clic en **"Download"** (botón azul en la esquina superior derecha).
4. Si no has iniciado sesión, GBIF te pedirá acceder con tu cuenta.
5. Elige el formato de descarga:
   - **Simple (CSV):** fácil de usar en Excel o R
   - **Darwin Core Archive (DwC-A):** recomendado para análisis más avanzados
6. Recibirás un correo con el enlace para descargar el archivo `.zip`.

---

## 📂 5. Usar los datos descargados en R

Puedes importar y explorar los datos usando los paquetes `readr` y `dplyr`:

```r
library(readr)
library(dplyr)

# Ruta del archivo descargado
# Ruta del archivo descargado
datos <- read_delim("/content/datos/0005661-251009101135966.csv", delim = "\t")

# Revisar las primeras filas
head(datos)

```

Elimina datos sin coordenadas y revisa cuántos datos fueron eliminados.
 
```r
# Filtrar registros con coordenadas válidas
datos_filtrados <- datos %>%
  filter(!is.na(decimalLatitude), !is.na(decimalLongitude))
# Revisar cuántos datos fueron eliminados 
dim(datos); dim(datos_filtrados)
```
Guarda los datos filtrados

```r
write.csv(datos_filtrados, "datos_filtrados.csv")

```


> 💡 Consejo: Si planeas hacer descargas frecuentes o masivas, usa la API de GBIF con el paquete [`rgbif`](https://cran.r-project.org/package=rgbif).

---

## 🧾 6. Citar los datos

Cada descarga de GBIF genera una **cita única con DOI**.  
Inclúyela siempre en tus informes o publicaciones, por ejemplo:

> GBIF.org (09 October 2025) GBIF Occurrence Download  
> [https://doi.org/10.15468/dl.abcd12](https://doi.org/10.15468/dl.abcd12)

---

## 🎯 Resumen

| Acción | Resultado |
|:--|:--|
| Crear cuenta en GBIF | Acceso a descargas personalizadas |
| Buscar una especie | Vista taxonómica y mapa interactivo |
| Descargar ocurrencias | Archivo con coordenadas y metadatos |
| Analizar en R | Integración con `rgbif`, `dplyr` y `sf` |

---

📘 **Autor:** Ricardo Segovia  
🧩 **Proyecto:** Curso BIODATA-Uruguay — Gestión y modelamiento de datos de biodiversidad  
📅 **Actualizado:** Octubre 2025

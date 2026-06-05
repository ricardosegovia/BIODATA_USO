---
layout: tutorial
title: "Antes de empezar"
description: "Guía inicial para usar el curso, organizar archivos, copiar código y resolver errores comunes."
section: introduccion
order: 0
data_url: /data/ejemplo_ocurrencias.csv
---

# Antes de empezar

## Objetivo

Preparar una forma de trabajo simple para seguir los tutoriales sin perderse entre archivos, paquetes y mensajes de error.

Al final deberías tener:

- Una carpeta de trabajo para el curso.
- RStudio o Google Colab listo para ejecutar código.
- Una forma clara de copiar, pegar y adaptar bloques de código.
- Un archivo pequeño de ejemplo para practicar.

## Qué necesitas

- Un navegador web actualizado.
- R y RStudio/Posit Desktop, o una cuenta de Google para usar Colab.
- Conexión a internet para instalar paquetes y descargar datos.
- Una carpeta local, por ejemplo `BIODATA_USO`.

<div class="callout tip" markdown="1">
**Recomendación:** si estás empezando, usa Google Colab para evitar instalaciones locales. Si ya tienes RStudio funcionando, usa RStudio.
</div>

## Cómo usar los tutoriales

Cada tutorial está pensado para avanzar en orden:

1. Lee el objetivo y los requisitos.
2. Copia un bloque de código con el botón **Copiar**.
3. Pégalo en RStudio o Colab.
4. Ejecuta el bloque completo.
5. Compara lo que obtienes con el resultado esperado.

Los bloques de código muestran el lenguaje arriba del bloque. La mayoría usa `R`.

```r
2 + 2
```

<div class="callout expected" markdown="1">
**Resultado esperado:** R debería responder `4`.
</div>

## Organizar la carpeta del curso

Una estructura sencilla evita muchos errores:

```text
BIODATA_USO/
  datos/
  scripts/
  resultados/
```

En R puedes revisar tu carpeta actual con:

```r
getwd()
```

Y puedes cambiarla con:

```r
setwd("ruta/a/BIODATA_USO")
```

<div class="callout warning" markdown="1">
**Atención:** evita tildes, espacios y caracteres especiales en nombres de carpetas y archivos. Usa nombres como `datos_gbif.csv` o `ocurrencias_limpias.csv`.
</div>

## Probar con datos de ejemplo

El sitio incluye un archivo pequeño para practicar: [ejemplo_ocurrencias.csv]({{ '/data/ejemplo_ocurrencias.csv' | relative_url }}).

Puedes leerlo en R de esta forma:

```r
datos <- read.csv("data/ejemplo_ocurrencias.csv")
head(datos)
```

<div class="callout expected" markdown="1">
**Resultado esperado:** deberías ver una tabla con columnas como `scientificName`, `decimalLatitude`, `decimalLongitude` y `countryCode`.
</div>

## Instalar y cargar paquetes

Cuando un tutorial usa un paquete por primera vez, instálalo una vez:

```r
install.packages("dplyr")
```

Luego cárgalo cada vez que abras una nueva sesión:

```r
library(dplyr)
```

<div class="callout warning" markdown="1">
**Error común:** si aparece `there is no package called`, instala el paquete con `install.packages("nombre")` y vuelve a ejecutar `library(nombre)`.
</div>

## Leer mensajes de error

Un error no significa que el tutorial esté roto. Normalmente indica una de estas cosas:

- Falta instalar o cargar un paquete.
- El archivo no está en la carpeta esperada.
- El nombre de una columna cambió.
- El código se copió incompleto.
- Hay un problema temporal de conexión.

Usa la página de [Ayuda]({{ '/ayuda/' | relative_url }}) cuando aparezca un mensaje difícil de interpretar.

## Ejercicio rápido

Ejecuta este bloque y cambia el nombre de la especie por otra:

```r
especie <- "Nothofagus pumilio"
mensaje <- paste("Estoy trabajando con", especie)
mensaje
```

<div class="callout expected" markdown="1">
**Resultado esperado:** R debería imprimir una frase con el nombre de la especie.
</div>

## Siguiente paso

Continúa con [Básicos de R]({{ '/tutorials/01-R_basics/' | relative_url }}) para repasar objetos, paquetes y funciones antes de trabajar con datos de biodiversidad.

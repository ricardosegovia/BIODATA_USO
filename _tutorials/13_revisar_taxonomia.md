---
layout: tutorial
title: "Revisar taxonomía de una lista de especies"
description: "Aprende a revisar taxonomías y visualizar tus datos taxonómicos"
section: datos
order: 13
---

# Tutorial: Revisar la taxonomía superior de una lista de especies 🌳

**Objetivo:**  
Aprender a obtener información taxonómica desde GBIF y visualizarla de forma jerárquica mediante un gráfico circular interactivo tipo *Sunburst*.

---

## 🧩 1) Preparar el entorno

Instala y carga los paquetes necesarios:

```r
install.packages(c("rgbif", "plotly", "dplyr"))
```

Luego cárgalos:

```r
library(rgbif)
library(plotly)
library(dplyr)
```

> 💡 Si `plotly` no se instala correctamente, asegúrate de tener actualizado R y Rtools.  
> `plotly` permite generar visualizaciones interactivas en HTML directamente desde R.

---

## 🌱 2) Cargar los datos

Descarga el archivo [`arboles_chile.csv`](https://drive.google.com/drive/folders/1AEBaUpxkLvdZ_P8UQwJaReevAlkuq0Bw?usp=sharing) y cópialo en tu carpeta de trabajo.

```r
arboles <- read.csv("./arboles_chile.csv")
colnames(arboles) <- c("num", "scientificName")
```

---

## 🔎 3) Obtener la taxonomía superior desde GBIF

Con la función `name_backbone_checklist()` del paquete **rgbif** puedes consultar la **taxonomía backbone de GBIF**:

```r
tax_completa <- name_backbone_checklist(unique(arboles$scientificName))
dim(tax_completa)
head(as.data.frame(tax_completa))
```

Selecciona las columnas relevantes:

```r
arboles_tax <- tax_completa[, c("order", "family", "scientificName", "status", "species")]
```

Visualiza los estados detectados (*Accepted*, *Synonym*, etc.):

```r
unique(arboles_tax$status)
print(arboles_tax[!arboles_tax$status == "ACCEPTED", ])
```

> 🧠 **Tip:**  
> Los corchetes `[]` permiten aplicar condiciones sobre un `data.frame`.  
> El signo `!` indica exclusión, y la coma al final señala que se seleccionan las filas que cumplen la condición.

---

## 🌿 4) Filtrar solo los nombres aceptados

Creamos una versión del conjunto de datos solo con nombres aceptados:

```r
arboles_revisado <- arboles_tax[arboles_tax$status == "ACCEPTED", ]
dim(arboles_tax); dim(arboles_revisado)
##Guardamos la lista de árboles revisada
write.csv(arboles_revisado, "./arboles_chile_revisado.csv", row.names = FALSE )
```

> 💬 En este caso no usamos el signo de exclamación, ya que queremos **mantener** los registros con estado “ACCEPTED”.

---

## 🍃 5) Preparar los datos para el gráfico *Sunburst*

Creamos una tabla limpia con el orden, familia y especie:

```r
arboles_sunburst <- arboles_revisado[, c("order", "family", "scientificName")]
# fíjate que la coma va al inicio del paréntesis de selección
colnames(arboles_sunburst) <- c("Order", "Family", "Species")

arboles_sunburst <- arboles_sunburst |>
  mutate(
    Order  = trimws(as.character(Order)),
    Family = trimws(as.character(Family)),
    Species = trimws(as.character(Species))
  ) |>
  filter(
    !is.na(Order),  Order  != "",
    !is.na(Family), Family != "",
    !is.na(Species), Species != ""
  ) |>
  distinct()
```

---

## 🌸 6) Construir la jerarquía de nodos

Definimos los niveles jerárquicos (**Orden → Familia → Especie**) y un nodo raíz:

```r
root_id <- "Arboles_de_Chile"

ordenes <- arboles_sunburst %>%
  distinct(Order) %>%
  mutate(id = Order, label = Order, parent = root_id)

familias <- arboles_sunburst %>%
  distinct(Order, Family) %>%
  mutate(
    id = paste(Order, Family, sep = "-"),
    label = Family,
    parent = Order
  )

especies <- arboles_sunburst %>%
  mutate(
    id = paste(Order, Family, Species, sep = "-"),
    label = Species,
    parent = paste(Order, Family, sep = "-")
  )

root <- data.frame(
  id = root_id,
  label = "Árboles de Chile",
  parent = NA_character_,
  stringsAsFactors = FALSE
)

sunburst_data <- bind_rows(
  root,
  ordenes %>% select(id, label, parent),
  familias %>% select(id, label, parent),
  especies %>% select(id, label, parent)
)
```

---

## 🌞 7) Crear el gráfico *Sunburst* interactivo

Usamos `plotly` para generar el gráfico jerárquico circular:

```r
fig <- plot_ly(
  data = sunburst_data,
  type = "sunburst",
  ids = ~id,
  labels = ~label,
  parents = ~parent,
  maxdepth = 3
) %>%
  layout(title = "Sunburst: Orden → Familia → Especie (Árboles de Chile)")

fig
```

---

## 🌳 Resultado

El gráfico muestra la estructura jerárquica de las especies de árboles de Chile, desde el **orden** hasta las **especies**.

> 🌐 Este tipo de visualización permite explorar la composición taxonómica de conjuntos de datos biológicos y detectar rápidamente qué grupos dominan o están más representados.

---

📘 **Autor:** Ricardo Segovia  
🧩 **Proyecto:** Curso BIODATA-Uruguay — *Gestión y modelamiento de datos de biodiversidad*  
📅 **Actualizado:** Octubre 2025

---
layout: default
title: "Ayuda"
permalink: /ayuda/
---

# Ayuda

<p class="lead">Soluciones cortas para errores frecuentes al trabajar con R, archivos, paquetes y GBIF.</p>

<div class="help-grid">
  <section class="help-card">
    <h2>Paquetes</h2>
    <dl>
      <dt><code>there is no package called ...</code></dt>
      <dd>Instala el paquete con <code>install.packages("nombre")</code> y luego carga con <code>library(nombre)</code>.</dd>
      <dt><code>could not find function ...</code></dt>
      <dd>Probablemente falta <code>library(paquete)</code> o escribiste mal el nombre de la función.</dd>
    </dl>
  </section>

  <section class="help-card">
    <h2>Archivos</h2>
    <dl>
      <dt><code>cannot open file</code></dt>
      <dd>Revisa tu carpeta actual con <code>getwd()</code> y confirma que el archivo esté ahí.</dd>
      <dt>Columnas que no aparecen</dt>
      <dd>Usa <code>names(datos)</code> para ver los nombres reales de las columnas antes de filtrar o seleccionar.</dd>
    </dl>
  </section>

  <section class="help-card">
    <h2>GBIF</h2>
    <dl>
      <dt>Descarga autenticada falla</dt>
      <dd>Confirma usuario, contraseña y correo. En scripts compartidos no publiques tus credenciales.</dd>
      <dt>La descarga tarda mucho</dt>
      <dd>Reduce filtros por país, año o especie, y espera a que GBIF termine de preparar el archivo.</dd>
    </dl>
  </section>

  <section class="help-card">
    <h2>Coordenadas</h2>
    <dl>
      <dt>El mapa sale vacío</dt>
      <dd>Revisa que <code>decimalLatitude</code> y <code>decimalLongitude</code> tengan valores numéricos y no estén invertidas.</dd>
      <dt>Puntos fuera del país</dt>
      <dd>Filtra por <code>countryCode</code> y revisa registros con problemas geoespaciales antes de mapear.</dd>
    </dl>
  </section>
</div>

## Checklist para pedir ayuda

Antes de pedir ayuda, intenta reunir:

- El bloque de código que ejecutaste.
- El mensaje de error completo.
- El resultado de `getwd()`.
- El resultado de `names(datos)` si el error involucra columnas.
- La versión de R con `R.version.string`.

```r
getwd()
names(datos)
R.version.string
```

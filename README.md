# Curso BIODATA-Uruguay

Sitio de GitHub Pages para alojar tutoriales (Jekyll + colección `tutorials/`).

## Ejecutar localmente

```bash
bundle install
bundle exec jekyll serve
```

Luego abre `http://localhost:4000/BIODATA_USO/`.

## Estructura principal

- `_tutorials/`: tutoriales del curso.
- `_layouts/`: plantillas de páginas y tutoriales.
- `assets/css/style.css`: diseño del sitio.
- `assets/js/copy-code.js`: botón para copiar bloques de código e índice interno.
- `assets/js/search.js`: búsqueda local de tutoriales.
- `data/`: datos pequeños de ejemplo para practicar.

## Publicación

Cada push a `main` ejecuta un workflow de GitHub Actions que compila el sitio con Jekyll. Si el build falla, revisa la pestaña **Actions** del repositorio.

---
layout: default
title: "Buscar"
permalink: /buscar/
---

# Buscar

<p class="lead">Encuentra tutoriales por tema, paquete, función o palabra clave.</p>

<div class="search-page" data-search-page>
  <label class="search-label" for="search-input">Buscar en los tutoriales</label>
  <input id="search-input" class="search-input" type="search" placeholder="Ejemplo: GBIF, mapview, dplyr, coordenadas" data-search-input>
  <p class="search-count" data-search-count></p>
  <div class="search-results" data-search-results></div>
</div>

{% assign labels = site.data.tutorial_sections.labels %}
{% assign tutorials = site.tutorials | where_exp: "item", "item.published != false" | sort: "order" %}
<script type="application/json" id="search-data">
[
{% for t in tutorials %}
  {
    "title": {{ t.title | jsonify }},
    "description": {{ t.description | default: t.summary | default: "" | jsonify }},
    "section": {{ labels[t.section] | default: t.section | jsonify }},
    "url": {{ t.url | relative_url | jsonify }},
    "order": {{ t.order | jsonify }},
    "content": {{ t.content | strip_html | normalize_whitespace | truncate: 6000 | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
</script>

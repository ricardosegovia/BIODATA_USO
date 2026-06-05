---
layout: default
title: Curso BIODATA-Uruguay
permalink: /tutorials/
---

# Tutoriales

<p class="lead">Guías paso a paso para practicar R, Colab y manejo de datos de biodiversidad durante el curso.</p>

{%- comment -%}
Si hay un archivo de datos con el orden deseado, úsalo.
De lo contrario, deriva las secciones desde los tutoriales.
{%- endcomment -%}
{% if site.data.tutorial_sections and site.data.tutorial_sections.order %}
  {% assign sections = site.data.tutorial_sections.order %}
  {% assign labels = site.data.tutorial_sections.labels %}
{% else %}
  {% assign sections = site.tutorials | map: 'section' | uniq | sort %}
{% endif %}

<div class="tutorial-index">
{%- for s in sections -%}
  {% assign items = site.tutorials | where: "section", s | sort: "order" %}
  {% if items.size > 0 %}
  {% assign label = labels[s] | default: s %}
  <section class="tutorial-section" aria-labelledby="section-{{ s | slugify }}">
    <div class="section-heading">
      <h2 id="section-{{ s | slugify }}">{{ label }}</h2>
      <span class="section-count">{{ items.size }} tutorial{% if items.size != 1 %}es{% endif %}</span>
    </div>
    <div class="tutorial-grid">
    {%- for t in items -%}
      <a class="tutorial-card" href="{{ t.url | relative_url }}">
        <span class="tutorial-number" aria-hidden="true">{{ t.order }}</span>
        <div class="tutorial-card-body">
          <h3>{{ t.title }}</h3>
          {% if t.description %}<p>{{ t.description }}</p>{% endif %}
        </div>
      </a>
    {%- endfor -%}
    </div>
  </section>
  {% endif %}
{%- endfor -%}
</div>

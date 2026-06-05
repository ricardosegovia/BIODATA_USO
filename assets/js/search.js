(function () {
  const ready = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  ready(() => {
    const root = document.querySelector('[data-search-page]');
    if (!root) return;

    const input = root.querySelector('[data-search-input]');
    const results = root.querySelector('[data-search-results]');
    const count = root.querySelector('[data-search-count]');
    const source = document.getElementById('search-data');
    const tutorials = parseSearchData(source);

    renderResults(tutorials, '', results, count);
    input.addEventListener('input', () => {
      renderResults(tutorials, input.value, results, count);
    });
  });

  function parseSearchData(source) {
    if (!source) return [];

    try {
      return JSON.parse(source.textContent || '[]');
    } catch (error) {
      return [];
    }
  }

  function renderResults(tutorials, query, results, count) {
    const normalizedQuery = normalize(query);
    const terms = normalizedQuery.split(/\s+/).filter(Boolean);
    const matches = tutorials
      .map((tutorial) => ({
        tutorial,
        score: scoreTutorial(tutorial, terms)
      }))
      .filter((item) => terms.length === 0 || item.score > 0)
      .sort((a, b) => b.score - a.score || Number(a.tutorial.order) - Number(b.tutorial.order))
      .slice(0, 20)
      .map((item) => item.tutorial);

    results.replaceChildren();

    matches.forEach((tutorial) => {
      results.appendChild(createResultCard(tutorial));
    });

    if (matches.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-results';
      empty.textContent = 'No encontré resultados. Prueba con otra palabra, por ejemplo GBIF, R, mapa o coordenadas.';
      results.appendChild(empty);
    }

    count.textContent = matches.length === 1
      ? '1 resultado'
      : matches.length + ' resultados';
  }

  function scoreTutorial(tutorial, terms) {
    if (terms.length === 0) return 1;

    const title = normalize(tutorial.title);
    const description = normalize(tutorial.description);
    const section = normalize(tutorial.section);
    const content = normalize(tutorial.content);

    return terms.reduce((score, term) => {
      if (title.includes(term)) return score + 8;
      if (description.includes(term)) return score + 5;
      if (section.includes(term)) return score + 3;
      if (content.includes(term)) return score + 1;
      return score;
    }, 0);
  }

  function createResultCard(tutorial) {
    const link = document.createElement('a');
    link.className = 'search-result-card';
    link.href = tutorial.url;

    const meta = document.createElement('span');
    meta.className = 'result-meta';
    meta.textContent = 'Tutorial ' + tutorial.order + ' · ' + tutorial.section;

    const title = document.createElement('h2');
    title.textContent = tutorial.title;

    const description = document.createElement('p');
    description.textContent = tutorial.description || 'Abrir tutorial';

    link.append(meta, title, description);
    return link;
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
})();

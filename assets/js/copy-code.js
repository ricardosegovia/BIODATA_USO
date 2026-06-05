(function () {
  const ready = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  ready(() => {
    enhanceCodeBlocks();
    buildTutorialToc();
  });

  function enhanceCodeBlocks() {
    const blocks = Array.from(document.querySelectorAll('.content pre'));

    blocks.forEach((pre) => {
      if (isLineNumberBlock(pre)) return;

      const frame = getCodeFrame(pre);
      if (!frame || frame.dataset.copyReady === '1') return;

      frame.dataset.copyReady = '1';
      frame.classList.add('code-frame');

      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';

      const label = document.createElement('span');
      label.className = 'code-language';
      label.textContent = getLanguageLabel(pre, frame);

      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.type = 'button';
      button.textContent = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código al portapapeles');

      button.addEventListener('click', () => copyCode(frame, button));

      toolbar.append(label, button);
      frame.prepend(toolbar);
    });
  }

  function getCodeFrame(pre) {
    const existingFrame = pre.closest('.code-frame');
    if (existingFrame) return existingFrame;

    const highlightParent = pre.parentElement && pre.parentElement.closest('.highlight');
    const figureParent = pre.closest('figure.highlight');
    const frame = highlightParent || figureParent;

    if (frame && frame !== pre) return frame;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-frame';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    return wrapper;
  }

  function isLineNumberBlock(pre) {
    return Boolean(pre.closest('.rouge-gutter, .gutter, td.gl, td.lineno'));
  }

  function getLanguageLabel(pre, frame) {
    const language = findLanguage(pre) || findLanguage(frame) || findLanguage(frame.parentElement);
    const labels = {
      bash: 'Shell',
      console: 'Shell',
      js: 'JavaScript',
      javascript: 'JavaScript',
      md: 'Markdown',
      py: 'Python',
      python: 'Python',
      r: 'R',
      rb: 'Ruby',
      ruby: 'Ruby',
      sh: 'Shell',
      shell: 'Shell',
      text: 'Código',
      txt: 'Código',
      yaml: 'YAML',
      yml: 'YAML'
    };

    return labels[language] || (language ? language.toUpperCase() : 'Código');
  }

  function findLanguage(element) {
    if (!element || !element.classList) return '';

    for (const className of element.classList) {
      if (className.indexOf('language-') === 0) {
        return className.replace('language-', '').toLowerCase();
      }
      if (className.indexOf('highlight-') === 0) {
        return className.replace('highlight-', '').toLowerCase();
      }
    }

    const code = element.querySelector && element.querySelector('code[class*="language-"]');
    return code ? findLanguage(code) : '';
  }

  async function copyCode(frame, button) {
    const codeNode =
      frame.querySelector('td.rouge-code pre, td.code pre, pre code, pre');
    const text = codeNode ? normalizeCodeText(codeNode.innerText || codeNode.textContent || '') : '';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }

      flashButton(button, 'Copiado', 'copied');
    } catch (error) {
      flashButton(button, 'Error', 'copy-error');
    }
  }

  function normalizeCodeText(text) {
    return text.replace(/\n+$/, '\n');
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.left = '-1000px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function flashButton(button, text, className) {
    const previousText = button.textContent;
    button.textContent = text;
    button.classList.add(className);

    window.setTimeout(() => {
      button.textContent = previousText;
      button.classList.remove(className);
    }, 1300);
  }

  function buildTutorialToc() {
    const toc = document.querySelector('[data-toc]');
    const body = document.querySelector('.tutorial-body');
    if (!toc || !body) return;

    const headings = Array.from(body.querySelectorAll('h2'))
      .filter((heading) => heading.textContent.trim().length > 0);
    const nav = toc.closest('.toc');

    if (headings.length < 2) {
      if (nav) nav.hidden = true;
      return;
    }

    const usedIds = new Map();

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = uniqueSlug(heading.textContent, usedIds);
      }

      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent.replace(/\s+/g, ' ').trim();
      item.appendChild(link);
      toc.appendChild(item);
    });
  }

  function uniqueSlug(text, usedIds) {
    const base = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'seccion';

    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? base + '-' + (count + 1) : base;
  }
})();

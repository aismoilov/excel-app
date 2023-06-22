class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html = '') {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(html) {
    if (html instanceof Dom) {
      html = html.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(html);
    } else {
      this.$el.appendChild(html);
    }

    return this;
  }

  on(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

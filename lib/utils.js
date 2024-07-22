const css = require('css');

function extractSelectors($) {
  const selectors = new Set();

  $('*').each((_, element) => {
    const classes = $(element).attr('class');
    if (classes) {
      classes.split(/\s+/).forEach(cls => selectors.add(`.${cls}`));
    }
    const id = $(element).attr('id');
    if (id) {
      selectors.add(`#${id}`);
    }
    selectors.add(element.name);
  });

  return Array.from(selectors);
}

function purgeUnusedCss(cssContent, usedSelectors) {
  const ast = css.parse(cssContent);

  ast.stylesheet.rules = ast.stylesheet.rules.filter(rule => {
    if (rule.type !== 'rule') return true;

    return rule.selectors.some(selector =>
      usedSelectors.some(usedSelector => selector.includes(usedSelector))
    );
  });

  return css.stringify(ast);
}

module.exports = {
  extractSelectors,
  purgeUnusedCss
};
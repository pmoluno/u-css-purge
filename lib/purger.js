const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');
const utils = require('./utils');

function purgeCss(options) {
  const {
    content = [],
    css = [],
    output = 'purged.css',
    whitelist = []
  } = options;

  let htmlContent = '';
  let cssContent = '';

  // Read HTML content
  content.forEach(pattern => {
    const files = glob.sync(pattern);
    files.forEach(file => {
      htmlContent += fs.readFileSync(file, 'utf8');
    });
  });

  // Read CSS content
  css.forEach(pattern => {
    const files = glob.sync(pattern);
    files.forEach(file => {
      cssContent += fs.readFileSync(file, 'utf8');
    });
  });

  const $ = cheerio.load(htmlContent);
  const usedSelectors = utils.extractSelectors($);

  // Add whitelist selectors
  usedSelectors.push(...whitelist);

  const purgedCss = utils.purgeUnusedCss(cssContent, usedSelectors);

  fs.writeFileSync(output, purgedCss);
  console.log(`Purged CSS saved to ${output}`);
}

module.exports = purgeCss;
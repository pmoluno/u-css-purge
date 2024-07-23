# u-purge-css

![NPM Version](https://img.shields.io/npm/v/u-css-purge)

An easy to use Node.js module that purges unused CSS code from your CSS files.

## Installation

```javascript
npm install u-purge-css
```

## Usage

```javascript
const purgeCss = require('u-purge-css');

purgeCss({
  content: ['./src/**/*.html', './src/**/*.js'],
  css: ['./src/**/*.css'],
  output: 'purged.css',
  whitelist: ['.keep-this-class']
});
```

## Options

- **content:** An array of glob patterns for your HTML and JS files
- **css:** An array of glob patterns for your CSS files
- **output:** The output file path for the purged CSS
- **whitelist:** An array of selectors to keep regardless of usage

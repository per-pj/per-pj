// src/.eleventy.js

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const MarkdownIt = require('markdown-it');
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  // ログ
  console.log('--- Eleventy config file is loading! ---');
  console.log(`Current directory: ${__dirname}`);

  // 静的アセットパススルー
  eleventyConfig.addPassthroughCopy('src/assets');
  console.log('Added passthrough copy for src/assets');

  // slug フィルタ
  eleventyConfig.addFilter('slug', (str) =>
    slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g })
  );
  console.log('Added slug filter');

  // mdFile フィルタ
  const md = new MarkdownIt();
  eleventyConfig.addFilter('mdFile', (filePath) => {
    const fullPath = path.join(__dirname, 'src', filePath);
    if (!fs.existsSync(fullPath)) {
      return `<p style="color:red;">Error: ${filePath} not found</p>`;
    }
    return md.render(fs.readFileSync(fullPath, 'utf-8'));
  });
  console.log('Added mdFile filter');

  // date フィルタ（Luxon）
  eleventyConfig.addNunjucksFilter('date', (dateObj, format) => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });
  console.log('Added date filter');

  // works コレクション
  eleventyConfig.addCollection('works', (collectionApi) =>
    collectionApi.getFilteredByGlob('./src/works/_posts/*.md')
  );
  console.log("Added 'works' collection");

  // 設定オブジェクト
  const config = {
    dir: {
      input: 'src',
      includes: 'includes',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['njk', 'html', 'md', 'liquid'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/per-pj/',
  };

  console.log('--- Returning Eleventy config object ---');
  console.log(config);

  return config;
};

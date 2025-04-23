const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const MarkdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  // この設定ファイルが実行されているか確認するログ
  console.log('--- Eleventy config file is loading! ---');
  console.log(`Current directory: ${__dirname}`);

  // パススルー: 静的アセットをコピー
  eleventyConfig.addPassthroughCopy('src/assets');
  console.log('Added passthrough copy for src/assets');

  // フィルター: slug 生成
  eleventyConfig.addFilter('slug', (str) =>
    slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g })
  );
  console.log('Added slug filter');

  // カスタムフィルター: Markdown ファイルを読み込んで HTML に変換
  const md = new MarkdownIt();
  eleventyConfig.addFilter('mdFile', (filePath) => {
    const fullPath = path.join(__dirname, 'src', filePath);
    if (!fs.existsSync(fullPath)) {
      // console.log(`Error: ${filePath} not found for mdFile filter`);
      return `<p style=\"color:red;\">Error: ${filePath} not found</p>`;
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    return md.render(content);
  });
  console.log('Added mdFile filter');

  // コレクション: works フォルダ内の _posts/*.md
  eleventyConfig.addCollection('works', (collectionApi) =>
    collectionApi.getFilteredByGlob('./src/works/_posts/*.md')
  );
  console.log("Added 'works' collection");

  // returnする設定オブジェクトを「変数に代入」する
  const config = {
    // ★ ここでオブジェクトを変数configに代入 ★
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

  // return する「前」に設定オブジェクトの内容を確認するログ
  console.log('--- Returning Eleventy config object ---');
  console.log(config); // ★ 変数configの内容を出力 ★

  return config; // ★ 変数configを return する ★
};

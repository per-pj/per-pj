const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const MarkdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  // パススルー: 静的アセットをコピー
  eleventyConfig.addPassthroughCopy('src/assets');

  // pathPrefixの設定を追加
  eleventyConfig.setPathPrefix('/[per-pj]/');

  // フィルター: slug 生成
  eleventyConfig.addFilter('slug', (str) =>
    slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g })
  );

  // カスタムフィルター: Markdown ファイルを読み込んで HTML に変換
  const md = new MarkdownIt();
  eleventyConfig.addFilter('mdFile', (filePath) => {
    const fullPath = path.join(__dirname, 'src', filePath);
    if (!fs.existsSync(fullPath)) {
      return `<p style=\"color:red;\">Error: ${filePath} not found</p>`;
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    return md.render(content);
  });

  // コレクション: works フォルダ内の _posts/*.md
  eleventyConfig.addCollection('works', (collectionApi) =>
    collectionApi.getFilteredByGlob('./src/works/_posts/*.md')
  );

  return {
    dir: {
      input: 'src',
      includes: 'includes',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['njk', 'html', 'md', 'liquid'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

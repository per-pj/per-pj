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
    slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g }),
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
  eleventyConfig.addCollection(
    'works',
    (collectionApi) =>
      collectionApi
        .getFilteredByGlob('./src/works/_posts/*.md')
        .sort((a, b) => b.date - a.date), // ← 新しい順にソート
  );
  console.log("Added 'works' collection");

  // 作品一覧と同じ順番で次の作品群を返し、末尾では先頭へ循環する
  eleventyConfig.addFilter('nextWorks', (works, currentUrl, count = 5) => {
    if (!Array.isArray(works) || works.length < 2) return [];
    const currentIndex = works.findIndex((item) => item.url === currentUrl);
    if (currentIndex < 0) return [];
    const itemCount = Math.min(Number(count) || 5, works.length - 1);
    return Array.from(
      { length: itemCount },
      (_, offset) => works[(currentIndex + offset + 1) % works.length],
    );
  });

  // 汎用的な work を除き、作品内容を端的に示す既存タグを1件選ぶ
  eleventyConfig.addFilter('primaryWorkTag', (tags = []) => {
    const candidates = tags.filter((tag) => tag !== 'work');
    const priority = [
      'AI', 'SNS', '音楽', '音声', '動画', '旅行', '不動産',
      'ヘルスケア', '採用', 'スポーツ', 'フィンテック', 'コミュニティ',
      'シェアリングエコノミー', 'マッチング', 'マーケティング',
      'コミュニケーション', '教育機関', '人材', 'C2C', 'B向け',
    ];
    return priority.find((tag) => candidates.includes(tag)) || candidates[0] || null;
  });

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

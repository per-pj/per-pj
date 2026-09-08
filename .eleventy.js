module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addCollection(
    'works',
    (collectionApi) =>
      collectionApi
        .getFilteredByGlob('./src/works/_posts/*.md')
        .sort((a, b) => b.date - a.date),
  );

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

  eleventyConfig.addFilter('withoutTrailingPeriod', (value = '') =>
    String(value).replace(/。$/, ''),
  );

  return {
    dir: {
      input: 'src',
      includes: 'includes',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    pathPrefix: '/per-pj/',
  };
};

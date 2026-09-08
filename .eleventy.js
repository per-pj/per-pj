module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addCollection(
    'works',
    (collectionApi) =>
      collectionApi
        .getFilteredByGlob('./src/works/_posts/*.md')
        .sort((a, b) =>
          String(b.data.releaseDate || '').localeCompare(
            String(a.data.releaseDate || ''),
          ),
        ),
  );

  eleventyConfig.addFilter('marketTags', (works = []) => {
    const order = [
      'エンターテインメント',
      'コミュニケーション',
      'ビジネス',
      '人材',
      '暮らし',
      'スポーツ',
      '金融',
    ];
    const available = new Set(works.map((item) => item.data.market).filter(Boolean));
    return order.filter((market) => available.has(market));
  });

  eleventyConfig.addFilter('formatReleaseDate', (value = '') => {
    const match = String(value).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
    if (!match) return '時期未詳';
    const [, year, month, day] = match;
    return day
      ? `${year}年${Number(month)}月${Number(day)}日`
      : `${year}年${Number(month)}月`;
  });

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

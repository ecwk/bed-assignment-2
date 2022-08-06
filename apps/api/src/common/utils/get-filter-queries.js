function getFilterQueries(req) {
  const query =
    typeof req.query.q === 'string'
      ? req.query.q !== ''
        ? req.query.q
        : '.*'
      : '.*';
  const limit =
    typeof req.query.limit === 'string'
      ? req.query.limit === 'none'
        ? 999999999
        : req.query.limit.match(/^\d+$/)
        ? parseInt(req.query.limit)
        : 10
      : 10;
  const page =
    typeof req.query.page === 'string'
      ? req.query.page.match(/^\d+$/)
        ? parseInt(req.query.page)
        : 1
      : 1;

  const exclude =
    req.query.exclude instanceof Array
      ? req.query.exclude
      : typeof req.query.exclude === 'string'
      ? [req.query.exclude]
      : [];

  const include =
    req.query.include instanceof Array
      ? req.query.include
      : typeof req.query.include === 'string'
      ? [req.query.include]
      : [];

  return { query, limit, page, exclude };
}

module.exports = getFilterQueries;

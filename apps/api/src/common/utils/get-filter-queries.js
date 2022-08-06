function getFilterQueries(req) {
  // if empty match all
  const query = typeof req.query.q === 'string' ? req.query.q : '.*';
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
  return { query, limit, page, exclude };
}

module.exports = getFilterQueries;

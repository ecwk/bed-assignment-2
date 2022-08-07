function getFilterQueries(
  req,
  defaults = {
    keys: []
  }
) {
  const { keys: keysDefault, availableKeys } = defaults;

  if (!req) {
    return {
      query: '.*',
      keys: keysDefault || [],
      limit: 'none',
      page: 1,
      exclude: [],
      include: []
    };
  }

  const query =
    typeof req.query.q === 'string'
      ? req.query.q !== ''
        ? req.query.q
        : '.*'
      : '.*';

  const unvalidatedKeys =
    req.query.k instanceof Array
      ? req.query.k
      : typeof req.query.k === 'string'
      ? [req.query.k]
      : keysDefault;

  const validatedKeys = unvalidatedKeys.filter((key) => availableKeys[key]);
  const keys = validatedKeys.length > 0 ? validatedKeys : keysDefault;

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
    req.query.e instanceof Array
      ? req.query.e
      : typeof req.query.e === 'string'
      ? [req.query.e]
      : [];

  const unvalidatedInclude =
    req.query.i instanceof Array
      ? req.query.i
      : typeof req.query.i === 'string'
      ? [req.query.i]
      : [];

  const include = unvalidatedInclude.filter((key) => availableKeys[key]);

  return { query, limit, page, exclude, include, keys };
}

module.exports = getFilterQueries;

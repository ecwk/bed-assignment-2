const { isEmpty } = require('lodash');

const AIRPORT_SELECT = {
  airportId: 'a.airport_id',
  name: 'a.name',
  country: 'a.country',
  city: 'a.city',
  description: 'a.description',
  createdOn: 'a.created_on',
  lastModifiedOn: 'a.last_modified_on'
};

const AirportModel = (database) => ({
  findAll: async (filters) => {
    const { page, limit, query, exclude, include, keys } = filters;
    const sqlQuery = `
        SELECT
        ${
          isEmpty(include)
            ? Object.entries(AIRPORT_SELECT)
                .map(([key, value]) => {
                  if (exclude.includes(key)) {
                    return '';
                  }
                  return `${value} AS ${key}`;
                })
                .filter(Boolean)
                .join(', ')
            : include
                .map((key) => `${AIRPORT_SELECT[key]} AS ${key}`)
                .join(', ')
        }
        FROM airport AS a
        WHERE
        ${Object.entries(AIRPORT_SELECT)
          .map(([key, value]) => {
            if (keys.includes(key)) {
              return `${value} REGEXP ?`;
            }
            return '';
          })
          .filter(Boolean)
          .join(' OR ')}
        LIMIT ?
        OFFSET ?
      `;
    const values = [...Array(keys.length)].map(() => query);
    values.push(limit);
    values.push((page - 1) * limit);

    const [airports] = await database.query(sqlQuery, values);
    return airports;
  },
  findOne: async (key, value, filters) => {
    const { page, limit, query, exclude, include, keys } = filters;

    const [airports] = await database.query(
      `
        SELECT
          ${
            isEmpty(include)
              ? Object.entries(AIRPORT_SELECT)
                  .map(([key, value]) => {
                    if (exclude.includes(key)) {
                      return '';
                    }
                    return `${value} AS ${key}`;
                  })
                  .filter(Boolean)
                  .join(', ')
              : include
                  .map((key) => `${AIRPORT_SELECT[key]} AS ${key}`)
                  .join(', ')
          }
        FROM airport AS a
        WHERE ?? = ?
      `,
      [key, value]
    );
    return airports[0];
  },
  create: async (airport) => {
    const results = await database.query(
      'INSERT INTO airport (name, country, city, description) VALUES (?, ?, ?, ?)',
      [airport.name, airport.country, airport.city, airport.description]
    );
    return results[0].insertId;
  }
});

module.exports = { AIRPORT_SELECT, AirportModel };

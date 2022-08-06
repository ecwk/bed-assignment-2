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
    const { page, limit, query, exclude } = filters;

    const [airports] = await database.query(
      `
        SELECT
          ${Object.entries(AIRPORT_SELECT)
            .map(([key, value]) => {
              if (exclude.includes(key)) {
                return '';
              }
              return `${value} AS ${key}`;
            })
            .filter(Boolean)
            .join(', ')}
        FROM airport AS a
        WHERE
          name REGEXP ?
          OR city REGEXP ?
          OR country REGEXP ?
        LIMIT ?
        OFFSET ?
      `,
      [query, query, query, limit, (page - 1) * limit]
    );
    return airports;
  },
  findOne: async (key, value) => {
    const [airports] = await database.query(
      `
        SELECT
          airport_id airportId,
          name,
          country,
          city,
          description,
          created_on createdOn,
          last_modified_on lastModifiedOn
        FROM airport
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

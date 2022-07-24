const AirportModel = (database) => ({
  findAll: async () => {
    const [airports] = await database.query(
      `
        SELECT
          a.airport_id airportId,
          a.name name,
          a.country country,
          a.city city,
          a.description description,
          a.created_on createdOn,
          a.last_modified_on lastModifiedOn
        FROM airport a
      `);
    return airports;
  },
  findOne: async (key, value) => {
    const [airports] = await database.query(
      'SELECT * FROM airport WHERE ?? = ?',
      [key, value]
    );
    return airports[0];
  },
  create: async (airport) => {
    const results = await database.query(
      'INSERT INTO airport (name, country, description) VALUES (?, ?, ?)',
      [airport.name, airport.country, airport.description]
    );
    return results[0].insertId;
  }
});

module.exports = { AirportModel };

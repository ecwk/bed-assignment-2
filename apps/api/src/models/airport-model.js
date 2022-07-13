module.exports = (database) => ({
  findAll: async () => {
    const [airports] = await database.query('SELECT * FROM airport');
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

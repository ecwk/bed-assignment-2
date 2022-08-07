const BOOKING_SELECT = {
  bookingId: 'b.booking_id',
  name: 'b.name',
  passport: 'b.passport',
  nationality: 'b.nationality',
  age: 'b.age',
  userId: 'b.user_id',
  flightId: 'b.flight_id'
};

const BookingModel = (database) => ({
  findOne: async (key, value, filters) => {
    const { page, limit, query, exclude, include, keys } = filters;

    const sqlQuery = `
      SELECT
        ${Object.entries(BOOKING_SELECT)
          .map(([key, value]) => {
            if (exclude.includes(key)) {
              return '';
            }
            return `${value} AS ${key}`;
          })
          .filter(Boolean)
          .join(', ')}
      FROM booking AS b
      WHERE ?? = ?
    `;
    const values = [key, value];
    const [bookings] = await database.query(sqlQuery, values);
    return bookings[0];
  },
  countOne: async (key, value) => {
    const sqlQuery = `
      SELECT COUNT(*) AS count
      FROM booking AS b
      WHERE ?? = ?
    `;
    const values = [key, value];
    const [[{ count }]] = await database.query(sqlQuery, values);
    return count;
  },
  create: async (booking, userid, flightid) => {
    const results = await database.query(
      `
        INSERT INTO booking
          (name, passport, nationality, age, user_id, flight_id)
        VALUES
          (?, ?, ?, ?, ?, ?);
      `,
      [
        booking.name,
        booking.passport,
        booking.nationality,
        booking.age,
        userid,
        flightid
      ]
    );
    return results[0].insertId;
  }
});

module.exports = { BookingModel, BOOKING_SELECT };

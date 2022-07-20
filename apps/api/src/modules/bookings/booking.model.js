const BookingModel = (database) => ({
  create: async (booking, userid, flightid) => {
    const results = await database.query(
      `
        INSERT INTO booking
          (name, passport, nationality, age, userid, flightid)
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

module.exports = { BookingModel };

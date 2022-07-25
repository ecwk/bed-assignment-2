const FlightModel = (database) => ({
  findOne: async (key, value) => {
    const [flights] = await database.query(
      'SELECT * FROM flight WHERE ?? = ?',
      [key, value]
    );
    return flights[0];
  },
  findAll: async () => {
    const [flights] = await database.query(
      `
        SELECT 
          f.flight_id flightId,
          f.flight_code flightCode,
          f.departure_date departureDate,
          f.travel_time travelTime,
          f.price price,
          f.aircraft_name aircraftName, 

          o.airport_id originAirportId,
          o.name originAirportName,
          o.country originAirportCountry,
          o.city originAirportCity,
          o.description originAirportDescription,

          d.airport_id destinationAirportId,
          d.name destinationAirportName,
          d.country destinationAirportCountry,
          d.city destinationAirportCity,
          d.description destinationAirportDescription,

          f.created_on createdOn,
          f.last_modified_on as lastModifiedOn
        FROM flight AS f
          INNER JOIN airport o ON f.origin_airport_id = o.airport_id
          INNER JOIN airport d ON f.destination_airport_id = d.airport_id
      `
    );
    return flights;
  },
  findDirectFlights: async (
    originAirportId,
    destinationAirportId,
    fromDate = '',
    toDate = ''
  ) => {
    const query = `
      SELECT
        flight_id flightId,
        flight_code flightCode,
        departure_date departureDate,
        travel_time travelTime,
        aircraft_name aircraftName,
        price price
      FROM flight
      WHERE
        origin_airport_id = ?
        AND destination_airport_id = ?
        ${fromDate && toDate ? `AND departure_date BETWEEN ?? AND ??` : ''}
    `;

    const [flights] = await database.query(query, [
      originAirportId,
      destinationAirportId,
      fromDate,
      toDate
    ]);
    return flights;
  },
  findAllTransferFlights: async (originAirportId, destinationAirportId) => {
    const [flights] = await database.query(
      `
        SELECT
          flightA.flightid AS firstFlightId,
          flightB.flightid AS secondFlightId,
          flightA.flightCode as flightCode1,
          flightB.flightCode as flightCode2,
          flightA.aircraft as aircraft1,
          flightB.aircraft as aircraft2,
          origin.name as originAirport,
          transfer.name as transferAirport,
          destination.name as destinationAirport,
          flightA.price + flightB.price as 'Total price'
        FROM
          flight flightA
          INNER JOIN flight flightB ON flightA.destinationAirport = flightB.originAirport
          INNER JOIN airport origin ON flightA.originAirport = origin.airportid
          INNER JOIN airport transfer ON flightB.originAirport = transfer.airportid
          INNER JOIN airport destination ON flightB.destinationAirport = destination.airportid
        WHERE
          flightA.originAirport = ?
          AND flightB.destinationAirport = ?;
      `,
      [originAirportId, destinationAirportId]
    );
    return flights;
  },
  create: async (flight) => {
    const results = await database.query(
      `
        INSERT INTO flight
          (flightCode, aircraft, originAirport, destinationAirport, departureDate, travelTime, price)
        VALUES
          (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        flight.flightCode,
        flight.aircraft,
        flight.originAirport,
        flight.destinationAirport,
        flight.departureDate,
        flight.travelTime,
        flight.price
      ]
    );
    return results[0].insertId;
  },
  deleteById: async (flightid) => {
    const results = await database.query(
      `
        DELETE FROM flight
        WHERE flightid = ?;
      `,
      [flightid]
    );
    return results[0].affectedRows;
  }
});

module.exports = { FlightModel };

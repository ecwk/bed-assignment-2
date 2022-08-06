const { AIRPORT_SELECT } = require('../airports');

const FLIGHT_SELECT = {
  flightId: 'f.flight_id',
  flightCode: 'f.flight_code',
  departureDate: 'f.departure_date',
  travelTime: 'f.travel_time',
  price: 'f.price',
  originAirportId: 'o.airport_id',
  originAirportName: 'o.name',
  originAirportCountry: 'o.country',
  originAirportCity: 'o.city',
  originAirportDescription: 'o.description',
  destinationAirportId: 'd.airport_id',
  destinationAirportName: 'd.name',
  destinationAirportCountry: 'd.country',
  destinationAirportCity: 'd.city',
  destinationAirportDescription: 'd.description',
  createdOn: 'f.created_on',
  lastModifiedOn: 'f.last_modified_on'
};

const FlightModel = (database) => ({
  findOne: async (
    key,
    value,
    filters = {
      exclude: []
    }
  ) => {
    const { exclude } = filters;

    const [flights] = await database.query(
      `
        SELECT
          ${Object.entries(FLIGHT_SELECT)
            .map(([key, value]) => {
              if (exclude.includes(key)) {
                return '';
              }
              return `${value} AS ${key}`;
            })
            .filter(Boolean)
            .join(', ')}
        FROM flight AS f
          INNER JOIN airport AS o ON o.airport_id = f.origin_airport_id
          INNER JOIN airport AS d ON d.airport_id = f.destination_airport_id
        WHERE ?? = ?
      `,
      [key, value]
    );
    return flights[0];
  },
  findAll: async (filters) => {
    const { page, limit, query, exclude } = filters;
    const [flights] = await database.query(
      `
        SELECT
          ${Object.entries(FLIGHT_SELECT)
            .map(([key, value]) => {
              if (exclude.includes(key)) {
                return '';
              }
              return `${value} AS ${key}`;
            })
            .filter(Boolean)
            .join(', ')}
        FROM flight AS f
          INNER JOIN airport AS o ON o.airport_id = f.origin_airport_id
          INNER JOIN airport AS d ON d.airport_id = f.destination_airport_id
        WHERE
          f.flight_id REGEXP ?
          OR f.flight_code REGEXP ?
          OR o.name REGEXP ?
          OR o.city REGEXP ?
          OR o.country REGEXP ?
          OR d.name REGEXP ?
          OR d.city REGEXP ?
          OR d.country REGEXP ?
        LIMIT ?
        OFFSET ?
      `,
      [
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        query,
        limit,
        (page - 1) * limit
      ]
    );
    return flights;
  },
  findDirectFlights: async (
    originAirportId,
    destinationAirportId,
    fromDate = '',
    toDate = '',
    page = 1,
    limit = 9999999999999
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
        ${fromDate && toDate ? `AND departure_date BETWEEN ? AND ?` : ''}
        `;
    // LIMIT ?, ?;

    const args = [originAirportId, destinationAirportId];
    if (fromDate && toDate) {
      args.push(...[fromDate, toDate]);
    }
    // args.push(page * limit, limit);

    const [flights] = await database.query(query, args);
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
          (flight_code, aircraft_name, departure_date, travel_time, price, origin_airport_id, destination_airport_id)
        VALUES
          (?, ?, ?, ?, ?, ?, ?);
      `,
      [
        flight.flightCode,
        flight.aircraftName,
        flight.departureDate,
        flight.travelTime,
        flight.price,
        flight.originAirportId,
        flight.destinationAirportId
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

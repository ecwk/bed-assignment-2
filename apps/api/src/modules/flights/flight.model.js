const { isEmpty } = require('lodash');

const { AIRPORT_SELECT } = require('../airports');

const FLIGHT_SELECT = {
  flightId: 'f.flight_id',
  flightCode: 'f.flight_code',
  aircraftName: 'f.aircraft_name',
  departureDate: 'f.departure_date',
  travelTime: 'f.travel_time',
  price: 'f.price',
  imageUrl: 'f.image_url',
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
  findAll: async (filters) => {
    const { page, limit, query, exclude, include, keys } = filters;

    const sqlQuery = `
      SELECT
        ${
          isEmpty(include)
            ? Object.entries(FLIGHT_SELECT)
                .map(([key, value]) => {
                  if (exclude.includes(key)) {
                    return '';
                  }
                  return `${value} AS ${key}`;
                })
                .filter(Boolean)
                .join(', ')
            : include.map((key) => `${FLIGHT_SELECT[key]} AS ${key}`).join(', ')
        }
      FROM flight AS f
        INNER JOIN airport AS o ON o.airport_id = f.origin_airport_id
        INNER JOIN airport AS d ON d.airport_id = f.destination_airport_id
      WHERE
        ${Object.entries(FLIGHT_SELECT)
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

    const [flights] = await database.query(sqlQuery, values);

    return flights;
  },
  count: async (filters) => {
    const { page, limit, query, exclude, include, keys } = filters;

    const sqlQuery = `
      SELECT
        COUNT(*) AS count
      FROM flight AS f
        INNER JOIN airport AS o ON o.airport_id = f.origin_airport_id
        INNER JOIN airport AS d ON d.airport_id = f.destination_airport_id
      WHERE
        ${Object.entries(FLIGHT_SELECT)
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

    const [[{ count }]] = await database.query(sqlQuery, values);

    return count;
  },
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
  findDirectFlights: async (
    originAirportId,
    destinationAirportId,
    fromDate = '',
    toDate = '',
    filters
  ) => {
    const { page, limit, query, exclude, include, keys } = filters;

    const sqlQuery = `
      SELECT
      ${
        isEmpty(include)
          ? Object.entries(FLIGHT_SELECT)
              .map(([key, value]) => {
                if (exclude.includes(key)) {
                  return '';
                }
                return `${value} AS ${key}`;
              })
              .filter(Boolean)
              .join(', ')
          : include.map((key) => `${FLIGHT_SELECT[key]} AS ${key}`).join(', ')
      }
      FROM flight AS f
        INNER JOIN airport AS o ON o.airport_id = f.origin_airport_id
        INNER JOIN airport AS d ON d.airport_id = f.destination_airport_id
      WHERE
        (${Object.entries(FLIGHT_SELECT)
          .map(([key, value]) => {
            if (keys.includes(key)) {
              return `${value} REGEXP ?`;
            }
            return '';
          })
          .filter(Boolean)
          .join(' OR ')})
        AND (f.origin_airport_id = ? AND f.destination_airport_id = ?)
        ${fromDate && toDate ? `AND departure_date BETWEEN ? AND ?` : ''}
      LIMIT ?
      OFFSET ?
      `;
    const values = [...Array(keys.length)].map(() => query);
    values.push(originAirportId);
    values.push(destinationAirportId);
    if (fromDate && toDate) {
      values.push(...[fromDate, toDate]);
    }
    values.push(limit);
    values.push((page - 1) * limit);

    const [flights] = await database.query(sqlQuery, values);
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
          (flight_code, aircraft_name, departure_date, travel_time, price, image_url, origin_airport_id, destination_airport_id)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        flight.flightCode,
        flight.aircraftName,
        flight.departureDate,
        flight.travelTime,
        flight.price,
        flight.imageUrl,
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

module.exports = { FlightModel, FLIGHT_SELECT };

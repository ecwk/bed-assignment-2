import { uniqBy } from 'lodash';

import { Flight, FlightOption } from '../types';

export const createFromData = (flights: Flight[]) => {
  const options: FlightOption[] = flights.map(
    ({
      originAirportName,
      originAirportId,
      originAirportCountry,
      originAirportCity,
      originAirportDescription
    }) => ({
      value: String(originAirportId),
      label: originAirportName,
      country: originAirportCountry,
      city: originAirportCity,
      name: originAirportName,
      description: originAirportDescription
    })
  );
  return uniqBy(options, 'value');
};
export const createToData = (flights: Flight[], originId: number) => {
  const options = flights
    .filter((flight) => flight.originAirportId === originId)
    .map(
      ({
        destinationAirportName,
        destinationAirportId,
        destinationAirportCountry,
        destinationAirportCity,
        destinationAirportDescription
      }) => ({
        value: String(destinationAirportId),
        label: destinationAirportName,
        country: destinationAirportCountry,
        city: destinationAirportCity,
        name: destinationAirportName,
        description: destinationAirportDescription
      })
    );
  return uniqBy(options, 'value');
};

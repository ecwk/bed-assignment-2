export type CreateFlightDto = {
  flightCode: string;
  aircraftName: string;
  departureDate: string;
  travelTime: string;
  price: number;
  originAirportId: number;
  destinationAirportId: number;
};

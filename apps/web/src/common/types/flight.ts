import { type Airport } from './airport';

export type Flight = {
  flightId: number;
  flightCode: string;
  aircraftName: string;
  departureDate: string;
  travelTime: string;
  price: string;
  originAirportId: number;
  destinationAirportId: number;
};

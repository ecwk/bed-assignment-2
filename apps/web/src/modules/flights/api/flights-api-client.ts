import { client } from '@config/axios';
import { type CreateFlightDto, type Flight } from '@modules/flights';

const createFlight = async (createFlightDto: CreateFlightDto) => {
  const response = await client.post('/flights', createFlightDto);
  const createdFlight: Flight = response.data?.flight;
  return createdFlight;
};

export const flightsApiClient = { createFlight };

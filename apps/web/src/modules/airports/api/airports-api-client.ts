import { client } from '@config/axios';

import { Airport } from '@common/types';
import { type CreateAirportDto } from '@modules/airports';

const createAirport = async (createeAirportDto: CreateAirportDto) => {
  const response = await client.post('/airports', createeAirportDto);
  const createdAirport: Airport = response.data?.flight;
  return createdAirport;
};

export const airportsApiClient = { createAirport };

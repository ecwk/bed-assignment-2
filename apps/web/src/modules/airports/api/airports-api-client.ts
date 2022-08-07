import { client } from '@config/axios';

import { Airport } from '@common/types';
import { type CreateAirportDto } from '@modules/airports';

const createAirport = async (createAirportDto: CreateAirportDto) => {
  const response = await client.post('/airports', createAirportDto);
  const createdAirport: Airport = response.data?.flight;
  return createdAirport;
};

export const airportsApiClient = { createAirport };

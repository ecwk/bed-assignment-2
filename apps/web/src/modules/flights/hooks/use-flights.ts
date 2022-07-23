import { Flight } from '@modules/flights';
import { client } from '@config/axios';

type FindAllResponse = {
  flights: Flight[];
};

export const useFlights = () => {
  const fetchFlights = async () => {
    const res = await client.get<FindAllResponse>('/flights');
    const { flights } = res.data;
    return flights;
  };

  return { fetchFlights };
};

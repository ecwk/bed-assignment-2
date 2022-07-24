import ms from 'ms';

export const getMs = (time: string): number => {
  // expect 2 hours 20 mins
  const hours = Number(time.split(' ')[0]);
  const mins = Number(time.split(' ')[2]);

  return ms(`${hours}h`) + ms(`${mins}m`);
};

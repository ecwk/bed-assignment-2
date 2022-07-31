export const getMockImage = () => {
  // random number from 500 - 600
  const random = Math.floor(Math.random() * 100) + 500;

  return `https://random.imagecdn.app/${random}/${random}`;
};
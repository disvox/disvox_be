export const generateRandomNDigitNumber = (n: number) => {
  const lowerBound = 10 ** (n - 1);
  const upperBound = 10 ** n - 1;

  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
};

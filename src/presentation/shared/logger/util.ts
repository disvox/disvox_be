import { Request } from 'express';

const getTimestamp = () => {
  return new Date().toISOString().replace(/T/, ' ').slice(0, 23);
};

export const getSourceIp = (request: Request) =>
  request.ip ??
  (request.headers['x-forwarded-for'] as string) ??
  request.socket.remoteAddress ??
  'localhost';

const roundByDecimal = (num: number, decimalAmount = 2) =>
  Math.round((num + Number.EPSILON) * 10 ** decimalAmount) /
  10 ** decimalAmount;

export const calculateResponseTime = (startAt: bigint, endAt: bigint) => {
  return roundByDecimal(Number(endAt - startAt) / 1e6, 2);
};

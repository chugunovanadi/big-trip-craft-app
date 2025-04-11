import {getRandomValue, getRandomBoolean, getRandomInteger} from '../utils.js';
import { generateDestinations } from './destination.js';

const POINT_COUNT = 5;
const MAX_OFFER_COUNT = 3;
const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const price = [1100, 500, 200, 1500, 700, 500];
const dateFrom = ['2019-07-04T12:10:05.432Z', '2019-07-05T06:59:59.999Z'];
const dateTo = ['2019-07-05T07:20:05.789Z', '2019-07-05T14:20:05.789Z', '2019-07-06T08:10:50.321Z', '2019-07-06T22:55:48.654Z', '2019-07-06T05:55:48.654Z'];

const generatePoint = () => ({
  basePrice: getRandomValue(price),
  dateFrom: getRandomValue(dateFrom),
  dateTo: getRandomValue(dateTo),
  isFavorite: getRandomBoolean(),
  destination: getRandomValue(generateDestinations()),
  type: getRandomValue(pointType),
});

const generatePoints = () => {
  let totalOfferCount = 0;
  const points = Array.from({length: POINT_COUNT}, generatePoint);
  return points.map((point, index) => {
    const hasOffers = getRandomInteger(0,1);
    const countOffer = (hasOffers)  ? getRandomInteger(1, MAX_OFFER_COUNT) : 0;
    totalOfferCount += countOffer;
    return {
      id: String(index+1),
      ...point,
      offers: (hasOffers) ? Array.from({length: countOffer}, (_, offerIndex) => String(totalOfferCount - offerIndex)) : [],
    };
  });
};
export {generatePoints, pointType};

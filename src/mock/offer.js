import {getRandomValue, getRandomInteger} from '../utils.js';
import {pointType} from '../mock/point.js';

const COUNT_OFFERS = 10;
const titles = ['Upgrade to business class', 'Add breakfast', 'Book tickets', 'Add luggage', 'Switch to comfort', 'Wi-Fi', 'Meal'];
const prices = ['40', '80', '90', '30'];

const generateOffersForPointType = () => Array.from({length: getRandomInteger(0, COUNT_OFFERS)}, (_, index) => ({
  id: String(index+1),
  titleOffer: getRandomValue(titles),
  priceOffer: getRandomValue(prices),
}));

const generateOffers = () => pointType.map((type) => ({
  type,
  offers: generateOffersForPointType(),
}));

export{generateOffers};

import {getRandomValue} from '../utils.js';

const COUNT_OFFERS = 15;
const titles = ['Upgrade to a business class', 'Order Uber', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city', 'Add luggage', 'Switch to comfort'];
const prices = ['120', '100', '90', '140'];

const generateOffer = () => ({
  titleOffer: getRandomValue(titles),
  priceOffer: getRandomValue(prices),
});

const generateOffers = () => {
  const offers = Array.from({length: COUNT_OFFERS}, generateOffer);
  return offers.map((offer, index) => ({
    ...offer,
    id: String(index+1),
  }));
};

export{generateOffers};

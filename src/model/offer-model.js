import { generateOffers } from '../mock/offer';

export default class OffersModel {

  allOffers = generateOffers();

  get = (point) => {
    if (!point.offers) {
      return [];
    }
    this.offersById = this.allOffers.filter((offer) => point.offers.includes(offer.id));
    return this.offersById;
  };
}

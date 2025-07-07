import { generateOffers } from '../mock/offer';

export default class OffersModel {
  #allOffers = generateOffers();
  #point = null;

  get allOffers() {
    return this.#allOffers;
  }

  getOffersByType(type) {
    const offersByType = this.#allOffers.find((offer) => offer.type === type);
    return offersByType ? offersByType.offers : [];
  }

  set currentPoint(newPoint) {
    this.#point = newPoint;
  }

  get currentPoint() {
    return this.#point;
  }

  get currentOffersByType() {
    if (!this.#point || !this.#point.offers) {
      return null;
    }
    return this.#allOffers.find((offer) => offer.type === this.#point.type);
  }

  get currentOffersById() {
    if (!this.#point || !this.#point.offers) {
      return [];
    }
    const availableForPointOffersByType = this.currentOffersByType;
    return availableForPointOffersByType.offers.filter((obj) => this.#point.offers.includes(obj.id));
  }
}

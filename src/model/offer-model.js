import { generateOffers } from '../mock/offer';

export default class OffersModel {
  #allOffers = generateOffers();
  #point = null;

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
    const offersByType = this.currentOffersByType;
    return offersByType.offers.filter((obj) => this.#point.offers.includes(obj.id));
  }
}

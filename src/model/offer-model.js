import { generateOffers } from '../mock/offer';

export default class OffersModel {

  allOffers = generateOffers();

  get = (point) => {
    if (!point.offers) {
      return { offersById: [], offersByType: null };
    }

    const offersByType = this.allOffers.find((offer) => offer.type === point.type);
    const offersById = offersByType.offers.filter((obj) => point.offers.includes(obj.id));

    return {
      offersById,
      offersByType
    };
  };
}


// export default class OffersModel {

//   allOffers = generateOffers();

//   get = (point) => {
//     if (!point.offers) {
//       return [];
//     }
//     const offersByType = this.allOffers.find((offer) => offer.type === point.type);
//     const offersById = offersByType.offers.filter((obj) => point.offers.includes(obj.id));
//     return offersById;
//   };
// }

// export default class OffersModel {

//   allOffers = generateOffers();
//   offersById = [];
//   offersByType = null;

//   get = (point) => {
//     if (!point.offers) {
//       this.offersById = [];
//       this.offersByType = null;
//       return;
//     }
//     this.offersByType = this.allOffers.find((offer) => offer.type === point.type);
//     this.offersById = this.offersByType.offers.filter((obj) => point.offers.includes(obj.id));
//   };

//   getOffersById = () => this.offersById;
//   getOffersByType = () => this.offersByType;
// };

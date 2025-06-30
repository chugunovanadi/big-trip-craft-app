import { generateDestinations } from '../mock/destination';

export default class DestinationsModel {
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}

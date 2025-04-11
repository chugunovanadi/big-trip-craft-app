import { generatePoints } from '../mock/point';

export default class PointsModel {
  #points = generatePoints();

  get points() {
    return this.#points;
  }
}

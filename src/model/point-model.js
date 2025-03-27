import { generatePoints } from '../mock/point';

export default class PointsModel {
  points = generatePoints();

  get = () => this.points;
}

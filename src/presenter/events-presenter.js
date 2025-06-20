import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils';

export default class EventsPresenter {
  #sortComponent =  new TripEventsSortView();
  #listComponent = new TripEventsListView();
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #points = null;
  #pointPresenters = new Map();

  constructor(container, pointsModel, offersModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderPointBoard();
  }

  #renderNoEvents = () => {
    render(new TripEventsListEmptyView, this.#container);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderPointList = () => {
    render(this.#listComponent, this.#container);
    for (let i = 0; i < this.#points.length; i++) {
      this.#offersModel.currentPoint = this.#points[i]; //сеттер модели по получению текущей точки
      this.#renderPoint(this.#points[i], this.#offersModel.currentOffersById, this.#offersModel.currentOffersByType, this.#listComponent);
    }
  };

  #renderPointBoard = () => {
    if (this.#points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  };

  #renderPoint = (point, offersById, offersByType, container) => {
    const pointPresenter = new PointPresenter(container, this.#handlePointChange, this.#handleChangeMode);
    pointPresenter.init(point, offersById, offersByType);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#offersModel.currentPoint = updatedPoint;
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offersModel.currentOffersById,  this.#offersModel.currentOffersByType);
  };

  #handleChangeMode = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetCurrentEdit());
  };

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}

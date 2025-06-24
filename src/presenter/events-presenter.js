import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventsListView from '../view/trip-events-list-view';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view';
import {render, replace} from '../framework/render';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils';
import { SortType } from '../const';
import { sortByDay, sortByPrice, sortByTime } from '../utils';

export default class EventsPresenter {
  #sortComponent =  null;
  #listComponent = new TripEventsListView();
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #points = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(container, pointsModel, offersModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortByDay);
    this.#sourcedPoints = [...this.#pointsModel.points].sort(sortByDay);
    this.#renderPointBoard();
  }

  #renderNoEvents = () => {
    render(new TripEventsListEmptyView, this.#container);
  };

  #renderSort = () => {
    if (this.#sortComponent === null) {
      this.#sortComponent = new TripEventsSortView(this.#currentSortType);
      render(this.#sortComponent, this.#container);
    } else {
      const updatedSortComponent = new TripEventsSortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }
    this.#sortComponent.setSortTypeChangeHandler(this.#handleChangeSortType);
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
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
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

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };

  #handleChangeSortType = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#renderSort();
    this.#clearPointList();
    this.#renderPointList();
  };
}

import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventItemView from '../view/trip-event-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventEditView from '../view/event-edit-view';
import { render } from '../render';

export default class EventsPresenter {
  #sortComponent =  new TripEventsSortView();
  #listComponent = new TripEventsListView();
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #points = null;

  constructor(container, pointsModel, offersModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderPointsBoard();
  }

  #renderPointsBoard = () => {
    render(this.#sortComponent, this.#container);
    render(this.#listComponent, this.#container);
    for (let i = 0; i < this.#points.length; i++) {
      this.#offersModel.currentPoint = this.#points[i]; //сеттер currentPoint
      this.#renderPoint(this.#points[i], this.#offersModel.currentOffersById, this.#offersModel.currentOffersByType, this.#listComponent);
    }
  };

  #renderPoint = (point, offersById, offersByType, container) => {
    const eventItemComponent = new TripEventItemView(point, offersById, offersByType);
    const eventEditComponent = new EventEditView(point, offersById, offersByType);

    const replacePointToEdit = () => {
      container.element.replaceChild(eventEditComponent.element, eventItemComponent.element);
    };

    const replaceEditToPoint = () => {
      container.element.replaceChild(eventItemComponent.element, eventEditComponent.element);
    };

    eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEdit();
    });

    eventEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToPoint();
    });

    eventEditComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceEditToPoint();
    });

    render(eventItemComponent, container.element);

  };

}

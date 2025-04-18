import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventItemView from '../view/trip-event-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventEditView from '../view/event-edit-view';
import TripEventsListEmptyView from '../view/trip-events-list-empty-view';
import { render, replace } from '../framework/render';

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
    if (this.#points.length === 0) {
      render(new TripEventsListEmptyView, this.#container);
      return;
    }
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
      replace(eventEditComponent, eventItemComponent);
    };

    const replaceEditToPoint = () => {
      replace(eventItemComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventItemComponent.setClickHandler(() => replacePointToEdit());

    eventEditComponent.setEditFormSubmitHandler(() => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setEditClickHandler(() => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setEditResetClickHandler(() => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    document.addEventListener('keydown', onEscKeyDown);

    render(eventItemComponent, container.element);
  };

}

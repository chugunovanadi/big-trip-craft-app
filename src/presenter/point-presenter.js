import TripEventItemView from '../view/trip-event-item-view';
import EventEditView from '../view/event-edit-view';
import { remove, render, replace } from '../framework/render';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #container = null;
  #point = null;
  #offersByType = null;
  #offersById = null;
  #eventComponent = null;
  #editComponent = null;
  #changeData = null;
  #mode = MODE.DEFAULT;
  #changeMode = null;
  #destinations = null;

  constructor(container, changeData, changeMode){
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offersById, offersByType, destinations) => {
    this.#point = point;
    this.#offersByType = offersByType;
    this.#offersById = offersById;
    this.#destinations = destinations;

    const prevEventComponent = this.#eventComponent;
    const prevEditComponent = this.#editComponent;

    this.#eventComponent = new TripEventItemView(this.#point, this.#offersById);
    this.#editComponent = new EventEditView(this.#point, this.#offersById, this.#offersByType, this.#destinations);

    this.#eventComponent.setRollupClickHandler(() => this.#replaceEventToEdit());
    this.#editComponent.setEditFormSubmitHandler(() => {
      this.#replaceEditToEvent();
    });
    this.#editComponent.setEditClickHandler(() => {
      this.#replaceEditToEvent();
    });
    this.#editComponent.setEditResetClickHandler(() => {
      this.#replaceEditToEvent();
    });
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevEventComponent === null || prevEditComponent === null) {
      render(this.#eventComponent, this.#container.element);
      return;
    }

    if (this.#container.element.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.element.contains(prevEditComponent.element)) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEditComponent);

  };

  #replaceEventToEdit = () => {
    replace(this.#editComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #replaceEditToEvent = () => {
    replace(this.#eventComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToEvent();
    }
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#editComponent);
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  resetCurrentEdit = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditToEvent();
    }
  };
}

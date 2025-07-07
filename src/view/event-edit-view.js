import AbstractStatefulView  from '../framework/view/abstract-stateful-view.js';
import {createEventTypeTemplate} from './event-edit-type-list-template.js';
import {createEventEditDestinationTimePriceTemplate} from './event-edit-destinations-time-price-template.js';
import { createEventEditOffersTemplate } from './event-edit-offers-template';
import { createEventEditDescriptionDestinationTemplate } from './event-edit-description-destination-template';
import { isDestinationEmpty, isOffersEmpty } from '../utils.js';

const BLANK_NEW_POINT = {
  offers: [],
  id: '',
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  isFavorite: null,
  destination: null,
  type: '',
};

const createEventEditTemplate = (data) => {
  const {offers, basePrice, dateFrom, dateTo, destination, type, offersByType, destinations} = data;
  return`
<li class="trip-events__item">
 <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${createEventTypeTemplate(type)}
      ${createEventEditDestinationTimePriceTemplate(basePrice, dateFrom, dateTo, destination, type, destinations)}
    </header>

    <section class="event__details">
      ${isOffersEmpty(offersByType) ? createEventEditOffersTemplate(offers, offersByType) : ''}
      ${isDestinationEmpty(destination) ? createEventEditDescriptionDestinationTemplate(destination) : ''}
    </section>
 </form>
</li>
`;};

export default class EventEditView extends AbstractStatefulView {
  constructor(point = BLANK_NEW_POINT, allOffers, destinations){
    super();
    this._state = EventEditView.transformPointToState(point, allOffers, destinations);
    this._restoreHandlers();
  }

  get template(){
    return createEventEditTemplate(this._state);
  }

  static transformPointToState = (point, allOffers, destinations) => ({
    ...point,
    allOffers: allOffers,
    offersByType: allOffers.find((offer) => offer.type === point.type),
    destinations: destinations,
  });

  static transformStateToPoint = (state) => {
    const point = {...state};
    delete point.offersByType;
    delete point.destinations;
    delete point.allOffers;
    return point;
  };

  #setInnerHandlers = () => {
    const typeList = this.element.querySelector('.event__type-list');
    if (typeList) {
      typeList.addEventListener('change', this.#changeInputTypeHandler);
    }
    const destinationInput = this.element.querySelector('.event__input--destination');
    if (destinationInput) {
      destinationInput.addEventListener('change', this.#changeInputDestinationHandler);
    }
    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('change', this.#changeInputOffersHandler);
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setEditFormSubmitHandler(this._callback.formSubmit);
    this.setEditRollupClickHandler(this._callback.clickRollupEdit);
    this.setEditResetClickHandler(this._callback.clickReset);
  };

  #changeInputTypeHandler = (evt) => {
    if (evt.target.name !== 'event-type') {
      return;
    }
    evt.preventDefault();

    const newType = evt.target.value;
    const newOffersByType = this._state.allOffers.find((offer) => offer.type === newType);

    this.updateElement({
      type: newType,
      offers: [],
      offersByType: newOffersByType,
    });
  };

  #changeInputDestinationHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this._state.destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: newDestination,
    });
  };

  #changeInputOffersHandler = (evt) => {
    if (evt.target.name !== 'event-offer') {
      return;
    }
    evt.preventDefault();

    const selectedOfferId = evt.target.id.split('event-offer-')[1];
    let updatedOffers = [...this._state.offers];

    if (evt.target.checked) {
      updatedOffers.push(selectedOfferId);
    } else {
      updatedOffers = updatedOffers.filter((id) => id !== selectedOfferId);
    }

    this.updateElement({
      offers: updatedOffers,
    });
  };

  setEditFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#editFormSubmitHandler);
  };

  #editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setEditRollupClickHandler = (callback) => {
    this._callback.clickRollupEdit = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollupClickHandler);
  };

  #editRollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickRollupEdit();
  };

  setEditResetClickHandler = (callback) => {
    this._callback.clickReset = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editResetClickHandler);
  };

  #editResetClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickReset();
  };

  reset = (point, allOffers, destinations) => {
    this.updateElement(EventEditView.transformPointToState(point, allOffers, destinations));
  };
}

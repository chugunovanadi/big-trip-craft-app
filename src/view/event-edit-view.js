import { createElement } from '../render.js';
import {createEventTypeTemplate} from './event-edit-type-list-template.js';
import {createEventEditDestinationTimePriceTemplate} from './event-edit-destinations-time-price-template.js';
import { createEventEditOffersTemplate } from './event-edit-offers-template';
import { createEventEditDescriptionDestinationTemplate } from './event-edit-description-destination-template';
import { isDestinationEmpty, isOffersEmpty } from '../utils.js';

const createEventEditTemplate = (point = {}, offersById, offersByType) => {
  const {
    id = '',
    basePrice = null,
    dateFrom = null,
    dateTo = null,
    isFavorite = null,
    destination = null,
    type = '',
  } = point;
  return`
<li class="trip-events__item">
 <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${createEventTypeTemplate(point)}
      ${createEventEditDestinationTimePriceTemplate(point)}
    </header>

    <section class="event__details">
      ${isOffersEmpty(point) ? createEventEditOffersTemplate(offersById, offersByType) : ''}
      ${isDestinationEmpty(point) ? createEventEditDescriptionDestinationTemplate(point) : ''}
    </section>
 </form>
</li>
`;};

export default class EventEditView {
  constructor(point, offersById, offersByType){
    this.point=point;
    this.offersById=offersById;
    this.offersByType = offersByType;
  }

  getTemplate(){
    return createEventEditTemplate(this.point, this.offersById, this.offersByType);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element=null;
  }

}

import { createElement } from '../render.js';
import {createEventTypeTemplate} from './event-edit-type-list-template.js';
import {createEventEditDestinationTimePriceTemplate} from './event-edit-destinations-time-price-template.js';
import { createEventEditOffersTemplate } from './event-edit-offers-template';
import { createEventEditDescriptionDestinationTemplate } from './event-edit-description-destination-template';

const createEventEditTemplate = () => `
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
  ${createEventTypeTemplate()}
  ${createEventEditDestinationTimePriceTemplate()}
  </header>

  <section class="event__details">
  ${createEventEditOffersTemplate()}
  ${createEventEditDescriptionDestinationTemplate()}
  </section>
</form>
`;

export default class EventEditView {
  getTemplate(){
    return createEventEditTemplate();
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

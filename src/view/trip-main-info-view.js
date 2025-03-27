import { createElement } from '../render';
import { humanizeEventDateDay } from '../utils';

const createTripMainInfoTemplate = (point) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
              <h1 class="trip-info__title">${point[0].destination.name} &mdash; ${point[1].destination.name} &mdash; ${point[2].destination.name} &mdash; ${point[3].destination.name}</h1>

              <p class="trip-info__dates">${humanizeEventDateDay(point[0].dateFrom)}&nbsp;&mdash;&nbsp; ${humanizeEventDateDay(point[0].dateTo)}</p>
    </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
  </section>
`;

export default class TripMainInfoView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this.point);
  }

  getElement(){
    if (!this.element){
      this.element = createElement(this.getTemplate());

    }
    return this.element;
  }

  removeElement(){
    this.element=null;
  }
}

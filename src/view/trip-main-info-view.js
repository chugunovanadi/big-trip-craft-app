import { createElement } from '../render';

const createTripMainInfoTemplate = () => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
          <h1 class="trip-info__title"> &mdash;  &mdash;  &mdash; </h1>

          <p class="trip-info__dates"> &nbsp; &mdash; &nbsp; </p>
    </div>

          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value"> </span>
          </p>
  </section>
`;

export default class TripMainInfoView {
  #point = null;
  #element = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createTripMainInfoTemplate(this.#point);
  }

  get element(){
    if (!this.#element){
      this.#element = createElement(this.template);

    }
    return this.#element;
  }

  removeElement(){
    this.#element=null;
  }
}

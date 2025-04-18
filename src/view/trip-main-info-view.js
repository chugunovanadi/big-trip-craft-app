import AbstractView from '../framework/view/abstract-view';

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

export default class TripMainInfoView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripMainInfoTemplate(this.#point);
  }
}

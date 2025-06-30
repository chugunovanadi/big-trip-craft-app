import { humanizeEventFullDate } from '../utils';
const createEventEditDestinationTimePriceTemplate = (point, destinations) => {
  const {basePrice, dateFrom, dateTo, destination, type} = point;

  return `
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.map((dest) => `<option value="${dest.name}"><option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventFullDate(dateFrom)}">
                     &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventFullDate(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
`;};

export {createEventEditDestinationTimePriceTemplate};

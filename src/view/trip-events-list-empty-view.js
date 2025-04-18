import AbstractView from '../framework/view/abstract-view';

const createEventsListEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class TripEventsListEmptyView extends AbstractView{
  get template() {
    return createEventsListEmptyTemplate();
  }
}

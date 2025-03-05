import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventItemView from '../view/trip-event-item-view';
import TripEventsListView from '../view/trip-events-list-view';
//import EventEditView from '../view/event-edit-view';
import { render } from '../render';
const EVENT_COUNT=9;

export default class EventsPresenter {
  sortComponent =  new TripEventsSortView();
  listComponent = new TripEventsListView();


  init(container) {
    this.container=container;
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    for (let i=0;i<= EVENT_COUNT; i++) {
      this.tripEventItemComponent = new TripEventItemView;
      render(this.tripEventItemComponent, this.listComponent.getElement());
    }
  }
}

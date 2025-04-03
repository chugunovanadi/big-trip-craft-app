import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventItemView from '../view/trip-event-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventEditView from '../view/event-edit-view';
import { render } from '../render';

export default class EventsPresenter {
  sortComponent =  new TripEventsSortView();
  listComponent = new TripEventsListView();

  init(container, pointsModel, offersModel) {
    this.container=container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.points = [...this.pointsModel.get()];

    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);

    const {  offersById: firstOffersById, offersByType: firstOffersByType } = this.offersModel.get(this.points[0]);
    render(new EventEditView(this.points[0], firstOffersById, firstOffersByType), this.listComponent.getElement());
    for (let i = 0; i < this.points.length; i++) {
      const { offersById: currentOffersById, offersByType: currentOffersByType } = this.offersModel.get(this.points[i]);
      render(new TripEventItemView(this.points[i], currentOffersById, currentOffersByType), this.listComponent.getElement());
    }
  }
}

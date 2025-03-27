import TripEventsSortView from '../view/trip-events-sort-view';
import TripEventItemView from '../view/trip-event-item-view';
import TripEventsListView from '../view/trip-events-list-view';
import EventEditView from '../view/event-edit-view';
import { render } from '../render';

export default class EventsPresenter {
  sortComponent =  new TripEventsSortView();
  listComponent = new TripEventsListView();

//учим принимать модельку EventEditView и TripEventItemView
  init(container, pointsModel, offersModel) {
    this.container=container;
    this.pointsModel = pointsModel; //передаем их снаружи в мейне
    this.offersModel = offersModel;
    this.points = [...this.pointsModel.get()];

    console.log(this.points);
    console.log(this.offersModel.get(this.points[0]));

    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);
    render(new EventEditView(this.points[0], this.offersModel.get(this.points[0])), this.listComponent.getElement());
    for (let i = 0; i < this.points.length; i++) {
      render(new TripEventItemView(this.points[i], this.offersModel.get(this.points[i])), this.listComponent.getElement());
    }
  }
}

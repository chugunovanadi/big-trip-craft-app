import TripMainInfoView from './view/trip-main-info-view';
import TripFiltersView from './view/trip-filters-view';
import EventsPresenter from './presenter/events-presenter';
import { render, RenderPosition } from './framework/render.js';
import OffersModel from './model/offer-model.js';
import PointsModel from './model/point-model.js';


const tripMainHeaderContainer = document.querySelector('.trip-main');
const tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel =  new OffersModel();
const eventsPresenter = new EventsPresenter(tripEventsContainer, pointsModel, offersModel);

render(new TripMainInfoView(pointsModel.points), tripMainHeaderContainer, RenderPosition.AFTERBEGIN);
render(new TripFiltersView, tripControlsFiltersContainer);

eventsPresenter.init();

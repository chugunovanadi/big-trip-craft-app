import TripMainInfoView from './view/trip-main-info-view';
import TripFiltersView from './view/trip-filters-view';
import EventsPresenter from './presenter/events-presenter';
import { render, RenderPosition } from './render';


const tripMainHeaderContainer = document.querySelector('.trip-main');
const tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(new TripMainInfoView, tripMainHeaderContainer, RenderPosition.AFTERBEGIN);
render(new TripFiltersView, tripControlsFiltersContainer);

const eventsPresenter = new EventsPresenter;

eventsPresenter.init(tripEventsContainer);

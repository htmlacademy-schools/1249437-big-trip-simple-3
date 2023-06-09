import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPointModel from './model/trip-point-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import {render} from './framework/render.js';
import NewTripPointButtonView from './view/new-trip-point-button-view.js';
import TripPointApiService from './trip-point-api-service.js';


const AUTHORIZATION = 'Basic daevka1307_4';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const boardContainer = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');
const tripPointApiService = new TripPointApiService(END_POINT, AUTHORIZATION);


const tripPointsModel = new TripPointModel({
  tripPointApiService
});


const destinationsModel = new DestinationsModel({tripPointApiService});
const offersModel = new OffersModel({tripPointApiService});
const filterModel = new FilterModel();


const newTripPointButtonComponent = new NewTripPointButtonView({
  onClick: handleNewTripPointButtonClick
});


const boardPresenter = new BoardPresenter({
  boardContainer,
  tripPointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewTripPointDestroy
});


function handleNewTripPointButtonClick() {
  boardPresenter.createTripPoint();
  newTripPointButtonComponent.element.disabled = true;
}

function onNewTripPointDestroy() {
  newTripPointButtonComponent.element.disabled = false;
}


const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  tripPointsModel
});


filterPresenter.init();
boardPresenter.init();
tripPointsModel.init()
  .finally(() => {
    render(newTripPointButtonComponent, siteHeaderElement);
  });

import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPointModel from './model/trip-point-model.js';


const main = document.querySelector('.page-body__page-main');
const pageContainer = main.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripPointsModel = new TripPointModel();
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, tripPointsModel});


render(new FilterView(), siteFilterElement);

boardPresenter.init();

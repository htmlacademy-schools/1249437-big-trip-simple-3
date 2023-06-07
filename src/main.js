import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import { mockInit, tripPoints } from './mock/point.js';
import { generateFilter } from './mock/filter.js';
import { generateSorter } from './mock/sort.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPointModel from './model/trip-point-model.js';


const pageContainer = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');


mockInit(5, 10);


const filters = generateFilter();
const sorters = generateSorter();


const tripPointsModel = new TripPointModel(tripPoints);
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, tripPointsModel, sorters});
render(new FilterView(filters), siteFilterElement);


boardPresenter.init();

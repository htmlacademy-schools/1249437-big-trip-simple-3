import FilterView from './view/filter.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const main = document.querySelector('.page-body__page-main');
const pageContainer = main.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: pageContainer});

render(new FilterView(), siteFilterElement);

boardPresenter.init();

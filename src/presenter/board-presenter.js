import TripPointPresenter from './trip-point-presenter';
import TripPointListView from '../view/trip-point-list-view';
import { SortType } from '../const';
import SortView from '../view/sort-view';
import CreateFormView from '../view/create-form-view';
import NoPointsView from '../view/no-points-view';
import {RenderPosition, render } from '../framework/render.js';
import { sortPointsByDate, sortPointsByPrice } from '../utils/sorts';
import { getItemFromItemsById } from '../utils/utils';


export default class BoardPresenter {

  #boardContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;
  #destinations = null;


  #tripPointsListComponent = new TripPointListView();
  #noTripPointComponent = new NoPointsView();
  #sortComponent = new SortView();
  #tripPointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];


  constructor({boardContainer, tripPointsModel}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
  }


  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#destinations = [...this.#tripPointsModel.destinations];
    this.#renderBoard();
    this.#sourcedTripPoints = [...this.#tripPointsModel.tripPoints];
  }


  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }


  #renderNoTripPoints() {
    render(this.#noTripPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }


  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };


  #sortTripPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortPointsByDate);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);

    this.#clearTripPointList();
    this.#renderTripPoints();
  };


  #renderTripPoint(tripPoint) {

    const tripPoinPresenter = new TripPointPresenter({
      tripPointList: this.#tripPointsListComponent.element,
      onModeChange: this.#handleModeChange
    });
    const currentDestination = getItemFromItemsById(this.#destinations, tripPoint.destination);
    tripPoinPresenter.init(tripPoint, currentDestination);
    this.#tripPointPresenter.set(tripPoint.id, tripPoinPresenter);
  }


  #renderTripPoints() {
    render(this.#tripPointsListComponent, this.#boardContainer);
    this.#tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }


  #renderBoard() {

    if (this.#tripPoints.length === 0) {
      this.#renderNoTripPoints();
      return;
    }
    this.#renderSort();

    render(new CreateFormView(this.#tripPoints[0]), this.#tripPointsListComponent.element);
    this.#renderTripPoints();
  }


  #clearTripPointList() {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  }
}

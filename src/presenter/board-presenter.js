import { sorts } from '../utils/sorts';
import EditFormView from '../view/edit-form-view';
import { updateItem } from '../utils/utils';
import {RenderPosition, render } from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter';
import SortView from '../view/sort-view';
import NoPointsView from '../view/no-points-view';
import TripPointListView from '../view/trip-point-list-view';
import { SortType } from '../const';


export default class BoardPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;
  #destinations = null;
  #offers = null;

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
    this.#offers = [...this.#tripPointsModel.offers];
    this.#renderBoard();
    this.#sourcedTripPoints = [...this.#tripPointsModel.tripPoints];
  }

  #handleTripPointChange = (updatedTripPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedTripPoint);
    this.#tripPointPresenter.get(updatedTripPoint.id).init(updatedTripPoint, this.#destinations, this.#offers);
  };

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
    if (sorts[sortType]) {
      this.#tripPoints.sort(sorts[sortType]);
    } else {
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
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleTripPointChange
    });

    tripPoinPresenter.init(tripPoint, this.#destinations, this.#offers);
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

    render(new EditFormView({destinations: this.#destinations, offers: this.#offers, isEditForm: false}), this.#tripPointsListComponent.element);
    this.#renderTripPoints();

  }

  #clearTripPointList() {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  }
}

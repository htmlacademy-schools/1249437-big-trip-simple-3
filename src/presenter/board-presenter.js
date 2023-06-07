import CreateFormView from '../view/create-form-view';
import {RenderPosition, render } from '../framework/render.js';
import TripPointPresenter from './tripPoint-presenter';
import TripPointListView from '../view/trip-point-list-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view';


export default class BoardPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #tripPoints = null;

  #tripPointsListComponent = new TripPointListView();
  #noTripPointComponent = new NoPointsView();
  #sortComponent = new SortView();
  #tripPointPresenter = new Map();

  constructor({boardContainer, tripPointsModel}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoTripPoints() {
    render(this.#noTripPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripPoint(tripPoint) {

    const tripPoinPresenter = new TripPointPresenter({
      tripPointList: this.#tripPointsListComponent.element,
      onModeChange: this.#handleModeChange
    });

    tripPoinPresenter.init(tripPoint);
    this.#tripPointPresenter.set(tripPoint.id, tripPoinPresenter);
  }


  #renderTripPoints() {
    this.#tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }

  #renderTripPointsList() {
    render(this.#tripPointsListComponent, this.#boardContainer);
    this.#renderTripPoints();
  }

  #renderBoard() {

    if (this.#tripPoints.length === 0) {
      render(this.#renderNoTripPoints, this.#boardContainer);
      return;
    }
    this.#renderSort();

    render(new CreateFormView(this.#tripPoints[0]), this.#tripPointsListComponent.element);
    this.#renderTripPointsList();

  }

  #clearTripPointList() {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  }
}

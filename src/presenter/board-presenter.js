import TripPointListView from '../view/trip-point-list-view';
import { sorts } from '../utils/sorts';
import { filter } from '../utils/filter';
import NoPointsView from '../view/no-points-view';
import { UpdateType, UserAction, FilterType, SortType } from '../const';
import NewTripPointPresenter from './new-trip-point-presenter';
import SortView from '../view/sort-view';
import { remove, RenderPosition, render } from '../framework/render.js';
import TripPointPresenter from './trip-point-presenter';


export default class BoardPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #tripPointsListComponent = new TripPointListView();
  #noTripPointComponent = null;
  #sortComponent = null;
  #tripPointPresenter = new Map();
  #newTripPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;


  constructor({boardContainer, tripPointsModel, destinationsModel, offersModel, filterModel, onNewTripPointDestroy}) {
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;


    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointListContainer: this.#tripPointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripPointDestroy
    });


    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[this.#filterType](tripPoints);

    return (sorts[this.#currentSortType]) ? filteredTripPoints.sort(sorts[this.#currentSortType]) : filteredTripPoints;
  }


  get destinations() {
    return this.#destinationsModel.destinations;
  }


  get offers() {
    return this.#offersModel.offers;
  }


  init() {
    this.#renderBoard();
  }


  createTripPoint() {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init(this.destinations, this.offers);
    this.#currentSortType = SortType.DAY;
  }


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {

      case UserAction.ADD_TRIPPOINT:
        this.#tripPointsModel.addTripPoint(updateType, update);
        break;

      case UserAction.UPDATE_TRIPPOINT:
        this.#tripPointsModel.updateTripPoint(updateType, update);
        break;

      case UserAction.DELETE_TRIPPOINT:
        this.#tripPointsModel.deleteTripPoint(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, data) => {

    switch(updateType) {

      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;

      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };


  #renderNoTripPoints() {
    this.#noTripPointComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render(this.#noTripPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }


  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #renderTripPoint(tripPoint) {
    const tripPoinPresenter = new TripPointPresenter({
      tripPointList: this.#tripPointsListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });

    tripPoinPresenter.init(tripPoint, this.destinations, this.offers);
    this.#tripPointPresenter.set(tripPoint.id, tripPoinPresenter);
  }


  #renderTripPoints(tripPoints) {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }


  #clearBoard(resetSortType = false) {

    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
    this.#newTripPointPresenter.destroy();


    remove(this.#sortComponent);

    if(this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }


  #renderBoard() {

    const tripPoints = this.tripPoints;

    if (tripPoints.length === 0) {
      this.#renderNoTripPoints();
      return;
    }

    this.#renderSort();
    render(this.#tripPointsListComponent, this.#boardContainer);
    this.#renderTripPoints(tripPoints);
  }
}

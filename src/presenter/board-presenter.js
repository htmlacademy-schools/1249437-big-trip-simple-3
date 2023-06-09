import TripPointPresenter from './trip-point-presenter';
import NewTripPointPresenter from './new-trip-point-presenter';
import SortView from '../view/sort-view';
import NoPointsView from '../view/no-points-view';
import TripPointListView from '../view/trip-point-list-view';
import LoadingView from '../view/loading-view';
import { UpdateType, UserAction, FilterType, SortType } from '../const';
import { sorts } from '../utils/sorts';
import { filter } from '../utils/filter';
import { render, RenderPosition, remove } from '../framework/render.js';


export default class BoardPresenter {

  #offersModel = null;
  #filterModel = null;
  #boardContainer = null;
  #tripPointsModel = null;
  #destinationsModel = null;


  #tripPointsListComponent = new TripPointListView();
  #noTripPointComponent = null;
  #loadingComponent = new LoadingView();
  #sortComponent = null;

  #tripPointPresenter = new Map();
  #newTripPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;


  constructor({boardContainer, tripPointsModel, destinationsModel, offersModel, filterModel, onNewTripPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

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
    const tripPoints = this.#tripPointsModel.tripPoints.sort(sorts[SortType.TIME]);
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
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if(this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    this.#newTripPointPresenter.init(this.destinations, this.offers);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


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
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if(this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {

    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }
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

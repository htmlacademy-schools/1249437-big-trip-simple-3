import { sorts } from '../utils/sort-utils';
import { filter } from '../utils/date-utils';
import NewWaypointPresenter from './new-waypoint-presenter';
import LoadingView from '../view/loading-view';
import NoWaypointMessage from '../view/no-waypoint-message-view';
import { remove, render, RenderPosition } from '../framework/render';
import WaypointPresenter from './waypoint-presenter';
import { UpdateType, UserAction, FilterType, SortType } from '../utils/constants-utils';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import SortingView from '../view/sorting-view';
import WaypointList from '../view/waypoint-list-view.js';


const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #waypointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  #boardContainer = null;
  #waypointsModel = null;
  #modelOffers = null;
  #modelDestinations = null;
  #modelFilter = null;
  #noWaypointMessage = null;
  #sortComponent = null;
  #newWaypointPresenter = null;


  constructor({boardContainer, waypointsModel, modelOffers, modelDestinations, modelFilter, onNewWaypointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#waypointsModel = waypointsModel;
    this.#modelOffers = modelOffers;
    this.#modelDestinations = modelDestinations;
    this.#modelFilter = modelFilter;

    this.#newWaypointPresenter = new NewWaypointPresenter({
      waypointListContainer: this.#waypointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewWaypointDestroy
    });


    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }


  get waypoints() {
    this.#filterType = this.#modelFilter.filter;
    const waypoints = this.#waypointsModel.waypoints.sort(sorts[SortType.TIME]);
    const filteredWaypoints = filter[this.#filterType](waypoints);
    return (sorts[this.#currentSortType]) ? filteredWaypoints.sort(sorts[this.#currentSortType]) : filteredWaypoints;
  }


  get destinations() {
    return this.#modelDestinations.destinations;
  }


  get offers() {
    return this.#modelOffers.offers;
  }


  init() {
    this.#renderBoard();
  }


  createWaypoint() {
    this.#currentSortType = SortType.DAY;
    this.#modelFilter.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.init(this.destinations, this.offers);
  }


  #renderSort() {
    this.#sortComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #renderNoWaypoint() {
    this.#noWaypointMessage = new NoWaypointMessage({
      filterType: this.#filterType
    });
    render(this.#noWaypointMessage, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #handleModeChange = () => {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };


  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, this.destinations, this.offers);

    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  }


  #renderWaypointsList(waypoints) {
    waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }


  #renderBoard() {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const waypoints = this.waypoints;
    if (waypoints.length === 0) {
      this.#renderNoWaypoint();
      return;
    }

    this.#renderSort();
    render(this.#waypointListComponent, this.#boardContainer);
    this.#renderWaypointsList(waypoints);
  }


  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {

      case UserAction.ADD_WAYPOINT:
        this.#newWaypointPresenter.setSaving();
        try {
          await this.#waypointsModel.addWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.UPDATE_WAYPOINT:
        this.#waypointPresenter.get(update.id).setSaving();
        try {
          await this.#waypointsModel.updateWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.DELETE_WAYPOINT:
        this.#waypointPresenter.get(update.id).setDeleting();
        try {
          await this.#waypointsModel.deleteWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {

      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data, this.destinations, this.offers);
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

  #clearBoard(resetSortType = false) {

    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noWaypointMessage) {
      remove(this.#noWaypointMessage);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

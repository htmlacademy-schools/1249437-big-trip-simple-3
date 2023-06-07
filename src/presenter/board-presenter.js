import SortView from '../view/sort-view';
import EditFormView from '../view/edit-form-view';
import CreateFormView from '../view/create-form-view';
import NoPointsView from '../view/no-points-view';
import {render, replace} from '../framework/render.js';
import { isEscapeKey } from '../utils';
import EventListView from '../view/trip-point-list-view';
import EventItemView from '../view/trip-point-view';


export default class BoardPresenter {
  #boardContainer = null;
  #tripPointsModel = null;
  #eventListComponent = null;
  #sorters = null;

  constructor({boardContainer, tripPointsModel, sorters}) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#sorters = sorters;
  }

  init() {
    const tripPoints = [...this.#tripPointsModel.tripPoints];
    if (tripPoints.length === 0) {
      render(new NoPointsView(), this.#boardContainer);
    } else {
      this.#eventListComponent = new EventListView();
      render(new SortView(this.#sorters), this.#boardContainer);
      render(this.#eventListComponent, this.#boardContainer);

      render(new CreateFormView(tripPoints[0]), this.#eventListComponent.element);

      for (let i = 1; i < tripPoints.length - 1; i++) {
        this.#renderTripPoint(tripPoints[i]);
      }
    }
  }


  #renderTripPoint(tripPoint) {
    const ecsKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    };

    const tripPointComponent = new EventItemView({
      tripPoint,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.body.addEventListener('keydown', ecsKeyDownHandler);
      }});

    const editFormComponent = new EditFormView({
      tripPoint,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editFormComponent, tripPointComponent);
    }

    function replaceFormToPoint() {
      replace(tripPointComponent, editFormComponent);
    }

    render(tripPointComponent, this.#eventListComponent.element);
  }
}

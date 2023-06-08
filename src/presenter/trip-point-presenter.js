import TripPointView from '../view/trip-point-view';
import { isEscapeKey } from '../utils/utils';
import EditFormView from '../view/edit-form-view';
import { replace, render, remove } from '../framework/render';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class TripPointPresenter {
  #handleModeChange = null;

  #tripPointList = null;
  #editFormComponent = null;
  #tripPointComponent = null;

  #tripPoint = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({tripPointList, onModeChange}) {
    this.#tripPointList = tripPointList;
    this.#handleModeChange = onModeChange;
  }

  init(tripPoint, destinations, offers) {
    this.#tripPoint = tripPoint;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#tripPointComponent = new TripPointView({
      tripPoint: this.#tripPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick
    });

    this.#editFormComponent = new EditFormView({
      tripPoint: this.#tripPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevTripPointComponent === null || prevEditFormComponent === null) {
      render(this.#tripPointComponent, this.#tripPointList);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#tripPointComponent, prevTripPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEditFormComponent);
    remove(prevTripPointComponent);
  }


  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#editFormComponent);
  }


  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#tripPoint);
      this.#replaceFormToPoint();
    }
  }


  #replacePointToForm = () => {
    replace(this.#editFormComponent, this.#tripPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };


  #replaceFormToPoint = () => {
    replace(this.#tripPointComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  };


  #ecsKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#tripPoint);
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
    }
  };


  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
    this.#editFormComponent.reset(this.#tripPoint);
  };


  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  };
}

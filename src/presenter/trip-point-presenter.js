import EditFormView from '../view/edit-form-view';
import { isEscapeKey } from '../utils/utils';
import { replace, render, remove } from '../framework/render';
import TripPointView from '../view/trip-point-view';


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
  #mode = Mode.DEFAULT;

  constructor({tripPointList, onModeChange}) {
    this.#tripPointList = tripPointList;
    this.#handleModeChange = onModeChange;
  }

  init(tripPoint) {
    this.#tripPoint = tripPoint;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#tripPointComponent = new TripPointView({
      tripPoint: this.#tripPoint,
      onEditClick: this.#handleEditClick
    });

    this.#editFormComponent = new EditFormView({
      tripPoint,
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevTripPointComponent === null || prevEditFormComponent === null) {
      render(this.#tripPointComponent, this.#tripPointList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
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
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  };
}

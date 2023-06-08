import EditFormView from '../view/edit-form-view';
import { isEscapeKey } from '../utils/utils';
import { isDatesEqual } from '../utils/formatTime-Utils';
import { replace, render, remove } from '../framework/render';
import TripPointView from '../view/trip-point-view';
import { UpdateType, UserAction } from '../const';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class TripPointPresenter {

  #handleModeChange = null;
  #handleDataChange = null;

  #tripPointList = null;
  #editFormComponent = null;
  #tripPointComponent = null;

  #tripPoint = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;


  constructor({tripPointList, onModeChange, onDataChange}) {
    this.#tripPointList = tripPointList;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
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
      onEditClick: this.#handleEditClick,
    });

    this.#editFormComponent = new EditFormView({
      tripPoint: this.#tripPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollUpButton: this.#handleRollupButtonClick,
      onDeleteClick: this.#handleDeleteClick
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
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
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
  };


  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#tripPoint.dateFrom, update.dateFrom) || this.#tripPoint.basePrice !== update.basePrice;
    this.#handleDataChange(
      UserAction.UPDATE_TRIPPOINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  };


  #handleRollupButtonClick = () => {
    this.#editFormComponent.reset(this.#tripPoint);
    this.#replaceFormToPoint();
  };


  #handleDeleteClick = (tripPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_TRIPPOINT,
      UpdateType.MINOR,
      tripPoint,
    );
  };
}

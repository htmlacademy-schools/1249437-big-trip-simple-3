import {isDatesEqual, isEsc} from '../utils/utils';
import {UpdateType, UserAction} from '../utils/const';
import {render, replace, remove} from '../framework/render';
import WaypointView from '../view/trip-point';
import EditForm from '../view/edit-form';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


export default class WaypointPresenter {
  #mode = Mode.DEFAULT;
  #offers = [];
  #destinations = [];
  #handleDataChange = null;
  #handleModeChange = null;
  #waypointList = null;
  #editFormComponent = null;
  #waypointComponent = null;
  #waypoint = null;


  constructor({waypointList, onModeChange, offers, destinations, onDataChange}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#waypointList = waypointList;
    this.#handleModeChange = onModeChange;
  }


  init(waypoint, destinations, offers) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#waypoint = waypoint;
    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#waypointComponent = new WaypointView({
      oneWaypoint: this.#waypoint,
      onClick: this.#handleEditClick,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#editFormComponent = new EditForm({
      oneWaypoint: waypoint,
      onSubmit: this.#handleFormSubmit,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollUpButton: this.#handleButtonClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#waypointList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#waypointComponent, prevEditFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEditFormComponent);
    remove(prevWaypointComponent);
  }


  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  }


  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToPoint();
    }
  }


  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }


  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }


  #replacePointToForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };


  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#waypointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editFormComponent.shake(resetFormState);
  }


  #replaceFormToPoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  };


  #ecsKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeydown);
    }
  };


  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeydown);
  };


  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#waypoint.dateFrom, update.dateFrom) || this.#waypoint.basePrice !== update.basePrice;
    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );

    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };


  #handleButtonClick = () => {
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };


  #handleDeleteClick = (waypoint) => {
    this.#handleDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };
}

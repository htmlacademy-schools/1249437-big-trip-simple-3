import { nanoid } from 'nanoid';
import EditFormView from '../view/edit-form-view';
import { isEscapeKey } from '../utils/utils';
import { UserAction, UpdateType } from '../const';
import { RenderPosition, render, remove } from '../framework/render';


export default class NewTripPointPresenter {

  #tripPointListContainer = null;
  #tripPointEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;


  constructor({tripPointListContainer, onDataChange, onDestroy}) {
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#tripPointListContainer = tripPointListContainer;
  }


  init(destinations, offers) {
    if (this.#tripPointEditComponent !== null) {
      return;
    }

    this.#tripPointEditComponent = new EditFormView({
      destinations: destinations,
      offers: offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditForm: false
    });


    render(this.#tripPointEditComponent, this.#tripPointListContainer, RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  }


  destroy() {
    if (this.#tripPointEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#tripPointEditComponent);
    this.#tripPointEditComponent = null;
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  }


  #ecsKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };


  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(
      UserAction.ADD_TRIPPOINT,
      UpdateType.MINOR,

      {id: nanoid(), ...tripPoint}
    );

    this.destroy();
  };


  #handleDeleteClick = () => {
    this.destroy();
  };
}

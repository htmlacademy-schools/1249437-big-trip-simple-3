import {createElement} from '../render.js';


function createTripPointListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}


export default class TripPointListView {
  #element = null;
  get template() {
    return createTripPointListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

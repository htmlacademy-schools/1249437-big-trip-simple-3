import AbstractView from '../framework/view/abstract-view';


const createTripPointListTemplate = () => ('<ul class="trip-events__list"></ul>');


export default class TripPointListView extends AbstractView {
  get template() {
    return createTripPointListTemplate();
  }
}

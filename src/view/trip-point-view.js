import {createElement} from '../render.js';
import { convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime, capitalizeType, getItemFromItemsById } from '../utils.js';
import { destinations } from '../mock/destination.js';
import { getOfferById } from '../mock/offers.js';


function createOffersTemplate(offersIDs, type) {
  return offersIDs.map((offerID) => {
    const offer = getOfferById(offerID, type);
    return `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
         &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
  }).join('');
}


function createTripPointTemplate(tripPoint) {
  const destination = getItemFromItemsById(destinations, tripPoint.destination);
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${convertToEventDateTime(tripPoint.dateFrom)}">${convertToEventDate(tripPoint.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${tripPoint.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalizeType(tripPoint.type)} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${convertToDateTime(tripPoint.dateFrom)}">${convertToTime(tripPoint.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${convertToDateTime(tripPoint.dateTo)}">${convertToTime(tripPoint.dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${tripPoint.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate(tripPoint.offersIDs, tripPoint.type)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}


export default class TripPointView {
  #element = null;
  #tripPoint = null;

  constructor({tripPoint}) {
    this.#tripPoint = tripPoint;
  }

  get template() {
    return createTripPointTemplate(this.#tripPoint);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}

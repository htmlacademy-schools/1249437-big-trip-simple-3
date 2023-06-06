import {createElement} from '../render.js';
import { convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime,convertToUpperCase } from '../utils.js';
import { getCityNameById } from '../mock/destination.js';
import { getOfferName, getOfferPrice } from '../mock/const.js';


function createOffersTemplate(offers) {
  return offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${getOfferName(offer)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${getOfferPrice(offer)}</span>
    </li>
  `).join('');
}


function createEventItemTemplate(eventPoint) {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = eventPoint;
  const eventDateTime = convertToEventDateTime(dateFrom);
  const eventDate = convertToEventDate(dateFrom);
  const fromDateTime = convertToDateTime(dateFrom);
  const fromTime = convertToTime(dateFrom);
  const toDateTime = convertToDateTime(dateTo);
  const toTime = convertToTime(dateTo);
  const offersTemplate = createOffersTemplate(offers);
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${convertToUpperCase(type)} ${getCityNameById(destination)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${fromDateTime}">${fromTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${toDateTime}">${toTime}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}


export default class EventItemView {
  constructor({tripPoint}) {
    this.tripPoint = tripPoint;
  }


  getTemplate() {
    return createEventItemTemplate(this.tripPoint);
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}


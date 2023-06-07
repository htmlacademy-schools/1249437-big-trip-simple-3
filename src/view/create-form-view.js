import AbstractView from '../framework/view/abstract-view.js';
import { convertToFormDate } from '../utils/formatTime-Utils.js';
import { capitalizeType, getItemFromItemsById } from '../utils/utils.js';
import { getOffersByType } from '../mock/offers.js';
import { destinations } from '../mock/destination.js';


function createOffersTemplate(offers, type, id) {
  return getOffersByType(type).map((offer) => {
    const isOfferChecked = offers.includes(offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').at(-1)}-${id}-${id}" type="checkbox" name="event-offer-${offer.title.split(' ').at(-1)}-${id}" ${isOfferChecked}>
      <label class="event__offer-label" for="event-offer-${offer.title.split(' ').at(-1)}-${id}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
}


function createDestinationPicsTemplate(destination) {
  return destination.pictures.map((pic) => `
  <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `).join('');
}


function createFormTemplate(tripPoint) {
  const visibility = tripPoint.offersIDs.length === 0 ? 'visually-hidden' : '';
  const destination = getItemFromItemsById(destinations, tripPoint.destination);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${tripPoint.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripPoint.type}.png" alt="${tripPoint.type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${tripPoint.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${tripPoint.id}">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${tripPoint.id}">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-${tripPoint.id}">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${tripPoint.id}">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${tripPoint.id}">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${tripPoint.id}">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${tripPoint.id}">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${tripPoint.id}">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-${tripPoint.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${tripPoint.id}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${tripPoint.id}">
          ${capitalizeType(tripPoint.type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${tripPoint.id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-${tripPoint.id}">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${tripPoint.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${tripPoint.id}" type="text" name="event-start-time" value="${convertToFormDate(tripPoint.dateFrom)} 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${tripPoint.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${tripPoint.id}" type="text" name="event-end-time" value="${convertToFormDate(tripPoint.dateFrom)} 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${tripPoint.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${tripPoint.id}" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers ${visibility}">Offers</h3>
        <div class="event__available-offers">
          ${createOffersTemplate(tripPoint.offersIDs, tripPoint.type, tripPoint.id)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createDestinationPicsTemplate(destination)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`
  );
}


export default class CreateFormView extends AbstractView {
  #tripPoint = null;

  constructor(tripPoint) {
    super();
    this.#tripPoint = tripPoint;
  }

  get template() {
    return createFormTemplate(this.#tripPoint);
  }
}

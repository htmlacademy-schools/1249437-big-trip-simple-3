export default class TripPointModel {

  #tripPoints = null;
  #destinations = null;
  constructor (tripPoints, destinations) {
    this.#tripPoints = tripPoints;
    this.#destinations = destinations;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  get destinations() {
    return this.#destinations;
  }
}

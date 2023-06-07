
export default class TripPointModel {
  #tripPoints = null;
  constructor (tripPoints) {
    this.#tripPoints = tripPoints;
  }

  get tripPoints() {
    return this.#tripPoints;
  }
}

import { UpdateType } from '../const';
import Observable from '../framework/observable';


export default class TripPointModel extends Observable {

  #tripPoints = [];
  #tripPointApiService = null;


  constructor ({tripPointApiService}) {
    super();
    this.#tripPointApiService = tripPointApiService;
  }


  get tripPoints() {
    return this.#tripPoints;
  }


  async init() {
    try {
      const tripPoints = await this.#tripPointApiService.tripPoints;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);
    } catch(err) {
      this.#tripPoints = [];
    }
    this._notify(UpdateType.INIT);
  }


  async updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting tripPoint');
    }


    try {
      const response = await this.#tripPointApiService.updateTripPoint(update);
      const updatedTripPoint = this.#adaptToClient(response);

      this.#tripPoints = [
        ...this.tripPoints.slice(0, index),
        updatedTripPoint,
        ...this.#tripPoints.slice(index + 1),
      ];

      this._notify(updateType, updatedTripPoint);
    } catch(err) {
      throw new Error('Can\'t update tripPoint');
    }
  }


  addTripPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints
    ];

    this._notify(updateType, update);
  }


  deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting tripPoint');
    }

    this.#tripPoints = [
      ...this.tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }


  #adaptToClient(tripPoint) {
    const adaptedTripPoint = {...tripPoint,
      dateFrom: tripPoint['date_from'],
      dateTo: tripPoint['date_to'],
      offersIDs: tripPoint['offers'],
      basePrice: tripPoint['base_price'],
    };

    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['offers'];

    return adaptedTripPoint;
  }
}

import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripPointApiService extends ApiService {
  get tripPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateTripPoint(tripPoint) {
    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripPoint)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(tripPoint) {
    const adaptedTripPoint = {...tripPoint,
      'date_from': new Date(tripPoint.dateFrom).toISOString(),
      'date_to': new Date(tripPoint.dateTo).toISOString(),
      'base_price': Number(tripPoint.basePrice),
      'offers': tripPoint.offersIDs
    };

    delete adaptedTripPoint.dateFrom;
    delete adaptedTripPoint.dateTo;
    delete adaptedTripPoint.basePrice;
    delete adaptedTripPoint.offersIDs;
    return adaptedTripPoint;
  }
}

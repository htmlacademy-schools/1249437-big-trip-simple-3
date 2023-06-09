import Observable from '../framework/observable';


export default class ModelOffers extends Observable {

  #offers = [];
  #waypointsApiService = null;


  constructor({waypointsApiService}) {
    super();
    this.#waypointsApiService = waypointsApiService;
    this.init();
  }


  get offers() {
    return this.#offers;
  }


  async init() {
    try {
      this.#offers = await this.#waypointsApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}

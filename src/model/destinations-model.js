import Observable from '../framework/observable';


export default class ModelDestinations extends Observable {

  #destinations = [];
  #waypointsApiService = null;


  constructor({waypointsApiService}) {
    super();
    this.#waypointsApiService = waypointsApiService;
    this.init();
  }


  async init() {
    try {
      this.#destinations = await this.#waypointsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }


  get destinations() {
    return this.#destinations;
  }
}

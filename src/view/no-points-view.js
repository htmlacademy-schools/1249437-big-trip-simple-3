import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';


const NoTaskTextType = {
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.EVERYTHING]: 'Click New Event to create your first point'
};


const createNoPointsTemplate = (filterType) => {
  const noTaskTextValue = NoTaskTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};


export default class NoPointsView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }


  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}

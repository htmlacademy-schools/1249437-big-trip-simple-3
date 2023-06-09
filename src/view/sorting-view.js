import {SortType, SortTypeDescription} from '../utils/constants-utils';
import {isSelectedOption} from '../utils/sort-utils';
import AbstractView from '../framework/view/abstract-view';


function createSortItemTemplate(sortType, currentSortType) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType}"  ${isSelectedOption(sortType)} ${(sortType === currentSortType ? 'checked' : '')}>
    <label class="trip-sort__btn" for="${sortType}">${SortTypeDescription[sortType]}</label>
  </div>`;
}


function createSortingTemplate(currentSortType) {
  const sortItemsTemplate = Object.keys(SortType).map((sortType) => createSortItemTemplate(SortType[sortType], currentSortType)).join('');
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`
  );
}


export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;


  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }


  get template() {
    return createSortingTemplate(this.#currentSortType);
  }


  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.value);
  };
}

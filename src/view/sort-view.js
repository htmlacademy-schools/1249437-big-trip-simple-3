import { SortType, SortTypeDescription } from '../const';
import { isDisabled } from '../utils/sorts';
import AbstractView from '../framework/view/abstract-view';


const createSortItemTemplate = (sortType, currentSortType) => (`
  <div class="trip-sort__item  trip-sort__item--${sortType} ">
    <input id="${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType}" ${isDisabled(sortType)} ${((sortType === currentSortType) ? 'checked' : '')}>
    <label class="trip-sort__btn" for="${sortType}">${SortTypeDescription[sortType]}</label>
  </div>`
);


const createSortTemplate = (currentSortType) => {
  const sortItemsTemplate = Object.keys(SortType).map((sortType) => createSortItemTemplate(SortType[sortType], currentSortType)).join('');
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`
  );
};


export default class SortView extends AbstractView {

  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this._callback.onSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSortTypeChange(evt.target.value);
  };
}

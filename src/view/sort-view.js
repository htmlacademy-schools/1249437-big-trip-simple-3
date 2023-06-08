import { capitalizeType } from '../utils/utils';
import { isDisabled } from '../utils/sorts';
import AbstractView from '../framework/view/abstract-view';
import { SortTypeForDrawing } from '../const';


const createSortItemTemplate = (sortType) => (`
  <div class="trip-sort__item  trip-sort__item--${sortType} ">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isDisabled(sortType)} ${(sortType === 'day' ? 'checked' : '')}>
    <label class="trip-sort__btn" for="sort-${sortType}">${capitalizeType(sortType)}</label>
  </div>`
);


const createSortTemplate = () => {
  const sortItemsTemplate = Object.values(SortTypeForDrawing).map((sortType) => createSortItemTemplate(sortType)).join('');
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
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSortTypeChange(evt.target.value);
  };
}

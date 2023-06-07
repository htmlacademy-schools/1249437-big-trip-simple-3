import { SortType } from '../mock/const';
import { capitalizeType } from '../utils/utils';
import AbstractView from '../framework/view/abstract-view';


function createSortItemTemplate(sortType) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}">
    <label class="trip-sort__btn" for="sort-${sortType}">${capitalizeType(sortType)}</label>
  </div>`;
}


function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType).map((sortType) => createSortItemTemplate(sortType)).join('');
  return (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`
  );
}


export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}

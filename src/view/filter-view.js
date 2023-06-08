import { FilterType } from '../const.js';
import { capitalizeType } from '../utils/utils.js';
import AbstractView from '../framework/view/abstract-view.js';


function createFilterItemTemplate(filterType) {
  return `
  <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${capitalizeType(filterType)}</label>
  </div>
  `;
}


function createFilterTemplate() {
  const filterItems = Object.keys(FilterType).map((filter) => createFilterItemTemplate(filter)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}


export default class FilterView extends AbstractView{

  get template() {
    return createFilterTemplate();
  }
}

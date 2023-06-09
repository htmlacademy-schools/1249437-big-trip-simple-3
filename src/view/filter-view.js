import AbstractView from '../framework/view/abstract-view.js';


const createFilterItemTemplate = (filter, currentFilterType) => (`
  <div class="trip-filters__filter">
      <input
      id="filter-${filter.type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter.type}"
      ${filter.type === currentFilterType ? 'checked' : ''} ${(filter.count === 0) ? 'disabled="true"' : ''}>
      <label class="trip-filters__filter-label"
      for="filter-${filter.type}">${filter.name}</label>
  </div>`
);


const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};


export default class FilterView extends AbstractView{

  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this._callback.onFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);

  }


  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.onFilterTypeChange(evt.target.value);
  };
}

const UserAction = {
  UPDATE_TRIPPOINT: 'UPDATE_TRIPPOINT',
  ADD_TRIPPOINT: 'ADD_TRIPPOINT',
  DELETE_TRIPPOINT: 'DELETE_TRIPPOINT',
};


const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};


const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer'
};


const FilterTypeDescriptions = {
  [FilterType.EVERYTHING]: 'EVERYTHING',
  [FilterType.PAST]: 'PAST',
  [FilterType.FUTURE]: 'FUTURE',
};


const SortTypeForDrawing = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};


export { UserAction, SortType, FilterTypeDescriptions, UpdateType, FilterType, SortTypeForDrawing };

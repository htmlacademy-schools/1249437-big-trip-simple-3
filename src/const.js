const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};


const FilterTypeDescriptions = {
  [FilterType.EVERYTHING]: 'EVERYTHING',
  [FilterType.PAST]: 'PAST',
  [FilterType.FUTURE]: 'FUTURE',
};


const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};


const SortTypeDescription = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFER]: 'Offer'
};


const UserAction = {
  UPDATE_TRIPPOINT: 'UPDATE_TRIPPOINT',
  ADD_TRIPPOINT: 'ADD_TRIPPOINT',
  DELETE_TRIPPOINT: 'DELETE_TRIPPOINT',
};


const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


export {SortType, FilterTypeDescriptions, SortTypeDescription, UserAction, UpdateType, FilterType, pointTypes };

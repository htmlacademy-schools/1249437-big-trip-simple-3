import { isTripDateBeforeToday } from '../utils';
import { FilterType } from './const';


const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isTripDateBeforeToday(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
};


function generateFilter() {
  return Object.keys(filter).map((filterName) => filterName );
}


export {generateFilter};

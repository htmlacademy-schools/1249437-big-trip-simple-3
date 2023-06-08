import dayjs from 'dayjs';
import { FilterType } from '../const';


const isFuture = (date) => date && dayjs().isBefore(date, 'D');
const isPast = (date) => date && dayjs().isAfter(date, 'D');


const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFuture(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPast(tripPoint.dateFrom)),
};


const generateFilter = () => Object.keys(filter).map((filterName) => filterName );


export { generateFilter, filter };

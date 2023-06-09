import { FilterType } from '../const';
import dayjs from 'dayjs';


const isFuture = (dateFrom, dateTo) => dateFrom && dateTo && (dayjs().isBefore(dateFrom, 'D') || dayjs().isBefore(dateTo, 'D'));
const isPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');


const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFuture(tripPoint.dateFrom, tripPoint.dateTo)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPast(tripPoint.dateTo)),
};


export { filter };

import dayjs from 'dayjs';


const disabledSorts = ['event', 'offer' ];
const isDisabled = (sortType) => (disabledSorts.includes(sortType) ? 'disabled' : '');


const sortPointsByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


export { sortPointsByDate, sortPointsByPrice, isDisabled };

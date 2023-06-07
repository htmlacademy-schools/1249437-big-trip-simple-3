import dayjs from 'dayjs';


const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const getRandomPic = () => `http://picsum.photos/248/152?r=${getRandomId()}`;


const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
const convertToDateTime = (date) => date.substring(0, date.indexOf('.'));
const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
const convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);


export {getRandomArrayElement, getRandomPrice, getRandomId, getRandomPic,
  convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime, convertToUpperCase, convertToFormDate};

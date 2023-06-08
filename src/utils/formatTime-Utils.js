import dayjs from 'dayjs';


const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';
const BASIC_DATE_FORMAT = 'DD/MM/YY HH:mm';


const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
const convertToDateTime = (date) => date.substring(0, date.lastIndexOf(':'));
const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
const convertToBasicime = (date) => dayjs(date).format(BASIC_DATE_FORMAT);
const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);


export {convertToEventDateTime, convertToFormDate, convertToTime, convertToBasicime, convertToDateTime,
  convertToEventDate};

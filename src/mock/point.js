import { getRandomPrice, getRandomItemFromItems, createIDgenerator} from '../utils/utils.js';
import {fromToDates, pointTypes } from './const.js';
import { destinations } from './destination.js';
import { getRandomOffersIdsByType } from '../utils/offers.js';

const tripPoints = [];


const generateTripPointId = createIDgenerator();


const generateTripPoints = (n) => {
  for (let i = 0; i < n; i++) {
    const dates = getRandomItemFromItems(fromToDates);
    const type = getRandomItemFromItems(pointTypes);
    const tripPoint = {
      basePrice: getRandomPrice(),
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
      destination: getRandomItemFromItems(destinations).id,
      id: generateTripPointId(),
      offersIDs: getRandomOffersIdsByType(type),
      type
    };
    tripPoints.push(tripPoint);
  }

  return tripPoints;
};


export { tripPoints, generateTripPoints};

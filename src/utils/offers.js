import { offersByType } from '../mock/const';
import { getRandomSliceFromItems } from './utils';


const getOffersByType = (type) => offersByType.find((offers) => offers.type === type).offers;


const getRandomOffersIdsByType = (type) => {
  const currentTypeRandomOffers = getRandomSliceFromItems(getOffersByType(type));
  return currentTypeRandomOffers.map((offer) => offer.id);
};


export { getOffersByType, getRandomOffersIdsByType };

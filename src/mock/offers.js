import { offersByType } from './const';
import { getRandomSliceFromItems } from '../utils/utils';


const getOffersByType = (type) => offersByType.find((offers) => offers.type === type).offers;


const getRandomOffersIdsByType = (type) => {
  const currentTypeRandomOffers = getRandomSliceFromItems(getOffersByType(type));
  return currentTypeRandomOffers.map((offer) => offer.id);
};


const getOfferById = (id, type) => (getOffersByType(type)
  .find((offer) => offer.id === id));


export { getOfferById, getRandomOffersIdsByType, getOffersByType };

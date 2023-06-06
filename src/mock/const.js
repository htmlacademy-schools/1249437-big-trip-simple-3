const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const offers = [
  {
    id: 1,
    title: 'Upgrade a business class',
    price: 120
  },
  {
    id: 2,
    title: 'Add luggage',
    price: 20
  },
  {
    id: 3,
    title: 'Switch to comfort',
    price: 50
  },
  {
    id: 4,
    title: 'Add meal',
    price: 90
  },
  {
    id: 5,
    title: 'Choose seats',
    price: 35
  },
  {
    id: 6,
    title: 'Travel by train',
    price: 190
  },
  {
    id: 7,
    title: 'Add alcohol',
    price: 250
  },
  {
    id: 8,
    title: 'Upgrade a car',
    price: 120
  },
  {
    id: 9,
    title: 'No queue',
    price: 150
  }
];


const getOfferName = (offerId) => offers.find((offer) => offer.id === offerId).title;
const getOfferPrice = (offerId) => offers.find((offer) => offer.id === offerId).price;


const taxiOffers = [1, 3];


const busOffers = [5, 6];


const trainOffers = [4, 5, 7];


const shipOffers = [4, 5, 7];


const driveOffers = [8];


const flightOffers = [4, 5, 6, 7];


const checkInOffers = [9];


const sightseeingOffers = [];


const restaurantOffers = [5];


const getArrayFromType = (type) => {
  switch (type) {
    case 'taxi':
      return taxiOffers;
    case 'bus':
      return busOffers;
    case 'train':
      return trainOffers;
    case 'ship':
      return shipOffers;
    case 'drive':
      return driveOffers;
    case 'flight':
      return flightOffers;
    case 'check-in':
      return checkInOffers;
    case 'sightseeing':
      return sightseeingOffers;
    case 'restaurant':
      return restaurantOffers;
  }
};


const descriptionPhrases = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'
];


const namesOfPlaces = [
  'Chamonix', 'Amsterdam', 'Geneva', 'Paris', 'Dubai', 'Istanbul'
];


const fromToDates = [
  {
    dateFrom: '2019-07-11T11:22:13.375Z',
    dateTo: '2019-07-11T11:40:13.375Z'
  },
  {
    dateFrom: '2019-07-13T11:22:13.375Z',
    dateTo: '2019-07-13T14:40:13.375Z'
  },
  {
    dateFrom: '2019-07-10T11:22:13.375Z',
    dateTo: '2019-07-10T11:40:13.375Z'
  },
  {
    dateFrom: '2019-07-15T09:15:13.375Z',
    dateTo: '2019-07-15T12:00:13.375Z'
  },
  {
    dateFrom: '2019-08-01T17:00:13.375Z',
    dateTo: '2019-08-01T18:00:13.375Z'
  },
  {
    dateFrom: '2019-08-03T11:22:13.375Z',
    dateTo: '2019-08-03T11:40:13.375Z'
  },
  {
    dateFrom: '2019-08-05T07:30:13.375Z',
    dateTo: '2019-08-05T09:00:13.375Z'
  },
  {
    dateFrom: '2019-07-18T20:20:13.375Z',
    dateTo: '2019-07-18T21:40:13.375Z'
  },
  {
    dateFrom: '2019-07-21T01:28:13.375Z',
    dateTo: '2019-07-21T07:40:13.375Z'
  },
  {
    dateFrom: '2019-07-28T16:15:13.375Z',
    dateTo: '2019-07-28T20:40:13.375Z'
  }
];


export {pointType, offers, getArrayFromType, descriptionPhrases, namesOfPlaces, fromToDates, getOfferName, getOfferPrice};

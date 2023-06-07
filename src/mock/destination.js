import { getRandomItemFromItems, createIDgenerator } from '../utils/utils';
import { descriptionPhrases, namesOfPlaces } from './const';


const destinations = [];
const NUMBER_OF_PICTURES = Math.floor(Math.random() * 6) + 1;


const generatePicId = createIDgenerator();
const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < NUMBER_OF_PICTURES; i++) {
    const picture = {
      src: `img/photos/${generatePicId()}.jpg`,
      description: getRandomItemFromItems(descriptionPhrases)
    };
    pictures.push(picture);
  }
  return pictures;
};


const generateDestinationId = createIDgenerator();


const generateDestinations = (n) => {
  for (let i = 0; i < n; i++) {
    const destination = {
      id: generateDestinationId(),
      description: getRandomItemFromItems(descriptionPhrases),
      name: getRandomItemFromItems(namesOfPlaces),
      pictures: generatePictures()
    };
    destinations.push(destination);
  }
};


export { destinations, generateDestinations };

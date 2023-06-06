import { getRandomPic, getRandomArrayElement } from '../utils';
import { descriptionPhrases } from './const';


const createPictures = () => ({
  src: getRandomPic(),
  description: getRandomArrayElement(descriptionPhrases)
});


export {createPictures};

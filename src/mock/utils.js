import { generateTripPoints } from './point';
import { generateDestinations } from './destination';


const mockInit = (numberOfTripPoints, numberOfDestinations) => {
  generateDestinations(numberOfDestinations);
  generateTripPoints(numberOfTripPoints);
};


export { mockInit };

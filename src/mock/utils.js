import { generateTripPoints } from './point';
import { generateDestinations } from './destination';


const mockInit = (numberOfTripPoints, numberOfDestinations) => {
  const destinations = generateDestinations(numberOfDestinations);
  const tripPoints = generateTripPoints(numberOfTripPoints);
  return [tripPoints, destinations];
};


export { mockInit };

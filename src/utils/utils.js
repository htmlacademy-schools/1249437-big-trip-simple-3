const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));

const getRandomItemFromItems = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;


const getRandomSliceFromItems = (items) => {
  const n = Math.floor(Math.random() * (items.length + 1));
  const shuffled = [...items].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, n);
};


const createIDgenerator = () => {
  let id = 1;
  return () => ++id;
};


const getRandomPicId = () => Math.floor(Math.random() * 5) + 1;

const isEscapeKey = (evt) => evt.key === 'Escape';

const capitalizeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);


export { getItemFromItemsById, getRandomItemFromItems, isEscapeKey, getRandomPicId, getRandomPrice,
  capitalizeType, createIDgenerator, getRandomSliceFromItems };

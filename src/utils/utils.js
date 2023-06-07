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


const isEscapeKey = (evt) => evt.key === 'Escape';


const capitalizeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);


export { getRandomSliceFromItems, getRandomItemFromItems, getItemFromItemsById, capitalizeType, createIDgenerator,
  getRandomPrice, isEscapeKey};

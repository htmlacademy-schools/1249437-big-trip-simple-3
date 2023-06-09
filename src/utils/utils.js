const isEscapeKey = (evt) => evt.key === 'Escape';
const capitalizeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);
const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));


export { capitalizeType, getItemFromItemsById, isEscapeKey };

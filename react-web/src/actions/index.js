export const fetchBeers = (page, per_page) => ({
  type: 'GET_BEERS',
  page,
  per_page
});
export const fetchBeerById = (id) => ({
  type: 'GET_BEER_BY_ID',
  id
});
export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
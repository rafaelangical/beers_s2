const reducer = (state = {}, action) => {
  switch (action.type) {

      //ALL BEERS
    case 'GET_BEERS':
      console.log('GET_BEERS REDUCER');
      return { ...state, loading: true };

      //BEERS RECEIVED
    case 'BEERS_RECEIVED':
      console.log('BEERS_RECEIVED REDUCER');
      return { ...state, beers: action.beers, loading: false }
    
      //FETCHING BEERS
    case 'FETCHING_BEERS':
      console.log('FETCHING_BEERS REDUCER');
      console.log('fetching BEERS data');
      return { ...state, loading: true }
    
      //ERROR ON GET BEERS
    case 'GET_BEERS_FAILED':
      console.log('FETCHING_BEERS_FAILED REDUCER');
      return { ...state, loading: false, error: true }

    ///////////////


      // GET CHARACTER BY ID  
    case 'GET_BEER_BY_ID': 
      console.log('GET_CHARACTER_BY_ID REDUCER');
      return { ...state, loadind: true }

      //FETCHING BEERS BY ID
    case 'FETCHING_BEER_BY_ID': 
      console.log('FETCHING_CHARACTER_BY_ID REDUCER');
      return { ...state, loadind: true }
      
      //BEERS RECEIVED
    case 'BEER_BY_ID_RECEIVED': 
      console.log('BEER_BY_ID REDUCER');
      return { ...state, beerById: action.beerById, loading: false }
      
      //BEERS GET FAILED 
    case 'GET_BEER_BY_ID_FAILED':
      console.log('GET_BEER_BY_ID_FAILED REDUCER');
      return { ...state, loading: false }

      ///////////////////
      
      //CLOSE MODAL
    case 'CLOSE_MODAL':
      console.log('CLOSE_MODAL REDUCER');
      return{ ...state, beerById: undefined }
      //DEFAULT PAYLODAD
    default: 
      return state;
  }
 };
export default reducer;
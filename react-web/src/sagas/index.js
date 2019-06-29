import { put, takeLatest, takeEvery,  all, call } from 'redux-saga/effects';

//fetch  all characters

function* fetchBeers(payload) {
  try{
    console.log('payload fetchbeers')
    console.log(payload)
    yield put({ type: 'FETCHING_BEERS'});
//    const resp = yield call(fetch, `https://api.punkapi.com/v2/beers?page=${payload.page}&per_page=${payload.per_page}`);
    const resp = yield call(fetch, `https://api.punkapi.com/v2/beers?page=${payload.page}&per_page=${payload.per_page}`);
    const data = yield resp.json();
    console.log(data)
    yield put({type: 'BEERS_RECEIVED', beers: data });
  }
  catch(e) {
    console.log(e)
    yield put({ type: 'GET_BEERS_FAILED'});
  }

}

//fetch character by id

function* fetchBeerById(payload) {
  
  try{
    yield put({ type: 'FETCHING_BEER_BY_ID'});
    const resp = yield call(fetch,`https://api.punkapi.com/v2/beers/${payload.id}`);
    console.log('payloadododod');
    console.log(payload);
    console.log(resp);
    const data = yield resp.json();
    console.log('dataaaa')
    console.log(data[0])
    yield put({type: 'BEER_BY_ID_RECEIVED', beerById: data[0] });
  }
 catch(e){
   yield put({ type: 'GET_BEER_BY_ID_FAILED'});
   console.log(e);
 }
}

function* actionWatcher() {
  yield takeLatest ('GET_BEERS', fetchBeers);
  yield takeLatest ('GET_BEER_BY_ID', fetchBeerById);
}

export default function* rootSaga() {
   yield all([actionWatcher(), ]);
}
import {select, join, spawn, fork, call, put, take, takeEvery, takeLatest, takeLeading} from 'redux-saga/effects'
import {useState} from "react";


// const wait = (t) => new Promise((resolve => {
//     setTimeout(resolve, t)
// }))



async function swapiGet(pattern) {
const request = await fetch(`http://swapi.dev/api/${pattern}`);

const data = await request.json();

return data;
}

export function* loadpeople(){
    const people = yield call(swapiGet, 'people');

    yield put({type: 'SET_PEOPLE', payload: people.results});
    console.log('load people');

    return people;
}

export function* loadplanets(){

    const planets = yield call(swapiGet, 'planets');

    yield put({type: 'SET_PLANETS', payload: planets.results});
    console.log('load planets');

}
export function* workerSaga() {
    console.log('run paralell tasks');
    const task = yield  fork(loadpeople);
    yield  spawn(loadplanets);

    const people = yield join(task);

    const store = yield select (s => s);
    console.log('finish paralell tasks', store );

    //console.log(data);
    // yield wait(1000);
    // console.log('click from saga');
}

export function* watchLoadDataSaga() {

yield  takeEvery('LOAD_DATA', workerSaga);



}

export default function* rootSaga() {
    yield fork(watchLoadDataSaga);

}
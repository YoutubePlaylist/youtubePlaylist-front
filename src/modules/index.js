import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth from "./auth";
import playlist, { playlistSaga } from "./playlist";
import isFirst, { isFirstSage } from "./isFirst";
import loading from "./loading";
import isPlay from "./isPlay";
import snackbar from "./snackbar";

// 일반 redux 연결
const rootReducer = combineReducers({
   auth,
   playlist,
   isFirst,
   loading,
   isPlay,
   snackbar,
});

// react saga 연결
export function* rootSaga() {
   yield all([playlistSaga(), isFirstSage()]);
}

export default rootReducer;

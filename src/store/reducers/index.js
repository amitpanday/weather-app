import { combineReducers } from 'redux';
import CurrentForecast from './currentForecast/';
import FutureForecast from './futureForecast/';

export default combineReducers({
    CurrentForecast,
    FutureForecast
});
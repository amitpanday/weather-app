import { create } from 'apisauce';
import apiPath from '../../../lib/apiPath';
import { API_KEY } from '../../../utlis/config';


const forecast = {

    getCurrentForecast: function (latitude, longitude) {
        const api = create({ baseURL: apiPath.getCurrentForecast });

        return dispatch => {
            api
                .get(`/?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                .then(response => response.data)
                .then((result) => {
                    // console.log('getCurrentForecast =>', result);
                    dispatch({
                        type: 'getCurrentForecast',
                        data: result,
                        error: false,
                        loading: false
                    });
                })
        }
    },

    getFutureForecast: function (latitude, longitude) {
        const api = create({ baseURL: apiPath.getFutureForecast });

        return dispatch => {
            api
                .get(`/?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                .then(response => response.data)
                .then((result) => {
                    // console.log('getFutureForecast =>', result);
                    dispatch({
                        type: 'getFutureForecast',
                        data: result,
                        error: false,
                        loading: false
                    });
                })
        }
    }

};

export default forecast;
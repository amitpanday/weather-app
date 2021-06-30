import { create } from 'apisauce';
import apiPath from '../../../lib/apiPath';
import { API_KEY } from '../../../utlis/config';

var dayForecast = [
    { day: '', dayTemp: null },
    { day: '', dayTemp: null },
    { day: '', dayTemp: null },
    { day: '', dayTemp: null },
    { day: '', dayTemp: null }
]

const forecast = {

    getCurrentForecast: function (latitude, longitude) {
        const api = create({ baseURL: apiPath.getCurrentForecast });

        return dispatch => {
            api
                .get(`/?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
                .then(response => response.data)
                .then((result) => {
                    console.log('getCurrentForecast =>', result);
                    dispatch({
                        type: 'getCurrentForecast',
                        data: result,
                        error: result.cod != 200 ? true : false,
                        loading: false
                    });
                })
        }
    },

    getFutureForecast: function (latitude, longitude) {
        const api = create({ baseURL: apiPath.getFutureForecast });

        return dispatch => {
            api
                .get(`/?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
                .then(response => response.data)
                .then((result) => {
                    for (let i = 0, j = 0; i <= 4; i++, j = j + 8) {
                        dayForecast[i].day = result.list[j].dt_txt.slice(0, 10);
                        dayForecast[i].dayTemp = result.list[j].main.temp;
                    }
                    setTimeout(() => {
                        dispatch({
                            type: 'getFutureForecast',
                            data: dayForecast,
                            error: result.cod != 200 ? true : false,
                            loading: false
                        });
                    }, 1000)
                })
        }
    }

};

export default forecast;
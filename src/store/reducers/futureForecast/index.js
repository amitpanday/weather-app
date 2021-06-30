const initialState = {
    data: [],
    error: false,
    loading: true
};

const futureForecast = (state = initialState, action) => {

    switch (action.type) {

        case 'getFutureForecast':
            return { ...state, data: action.data, error: action.error, loading: action.loading }
        default:
            return state;

    }
};

export default futureForecast;
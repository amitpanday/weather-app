const initialState = {
    data: [],
    error: false,
    loading: true
};

const currentForecast = (state = initialState, action) => {
    switch (action.type) {

        case 'getCurrentForecast':
            return { ...state, data: action.data, error: action.error, loading: action.loading }
        default:
            return state;

    }
};

export default currentForecast;
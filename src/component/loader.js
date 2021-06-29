import React from 'react';
import LottieView from 'lottie-react-native';

export default loader = ({ isVisiable }) => {
    if (isVisiable) {
        return (<LottieView source={require('../assets/animation.json')} autoPlay loop />)
    } else {
        return null;
    }
}
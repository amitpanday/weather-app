import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { create } from 'apisauce';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../component/loader';
import actions from '../store/actions/';

const { width, height } = Dimensions.get('screen');



class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { ForecastAction } = this.props;
        const latitude = '25.594095';
        const longitude = '85.137566';
        ForecastAction.getCurrentForecast(latitude, longitude);
        ForecastAction.getFutureForecast(latitude, longitude);
    }

    getForecastData = () => {
        const { ForecastAction } = this.props;
        const latitude = '25.594095';
        const longitude = '85.137566';

        ForecastAction.getCurrentForecast(latitude, longitude);

        ForecastAction.getFutureForecast(latitude, longitude);
    }

    render() {
        const { CurrentForecastData, FutureForecastData } = this.props;
        console.log(JSON.stringify(FutureForecastData));
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
                    <Loader isVisiable={CurrentForecastData.loading} />
                    {CurrentForecastData.error || FutureForecastData.error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{`Something Went \nWrong at our \nEnd`}</Text>
                            <TouchableOpacity onPress={() => this.getForecastData()} style={styles.errorButton}>
                                <Text style={styles.buttonText}>RETRY</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    {!CurrentForecastData.loading ? (
                        <>
                            <View style={styles.upperContainer}>
                                <View style={{ flexDirection: 'row', paddingLeft: 35 }}>
                                    <Text style={styles.numberText1}>
                                        {Math.round(parseFloat(CurrentForecastData.data.main.temp))}
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '600' }}>0</Text>
                                </View>
                                <Text style={styles.text1}>
                                    {CurrentForecastData.data.name}
                                </Text>
                            </View>
                            {!FutureForecastData.loading ? (
                                <View style={styles.buttomContainer}>
                                    {FutureForecastData.data.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.buttomRow}>
                                                <Text style={styles.text2}>
                                                    {new Date(item.day).toTimeString()}
                                                </Text>
                                                <Text style={styles.numberText2}>
                                                    {Math.round(parseFloat(item.dayTemp))}
                                                </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            ) : null}
                        </>
                    ) : null}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42b9f5'
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '400',
        color: '#fff'
    },
    errorButton: {
        width: 100,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: '#ed2602'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    },
    upperContainer: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText1: {
        fontSize: 100,
        fontWeight: '500',
        color: '#fff'
    },
    numberText2: {
        fontSize: 22,
        fontWeight: '400',
        color: '#fff'
    },
    text1: {
        fontWeight: '400',
        fontSize: 40,
        color: '#fff'
    },
    text2: {
        fontSize: 22,
        fontWeight: '400',
        color: '#fff'
    },
    buttomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        height: 45,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        paddingRight: 50
    },
    buttomContainer: {
        height: height / 2,
        marginTop: 80
    }
});
const mapStateToProps = state => {

    return {
        CurrentForecastData: state.CurrentForecast,
        FutureForecastData: state.FutureForecast
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        ForecastAction: bindActionCreators(actions.Forecast, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
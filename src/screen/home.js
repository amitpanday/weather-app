import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

import Loader from '../component/loader';
import actions from '../store/actions/';
import { getFontSize, dynamicSize } from '../utlis/responsive';

const { width, height } = Dimensions.get('screen');



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            refreshing: false
        }
    }

    componentDidMount() {
        this.getCorrentLocation();
    }

    getCorrentLocation = () => {
        try {
            Geolocation.getCurrentPosition(userLocation => {
                const { latitude, longitude } = userLocation.coords;
                this.setState({ latitude, longitude }, this.getForecastData)
            }, (error) => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        } catch (error) {
            console.log(error);
        }
    }

    getForecastData = () => {
        const { ForecastAction } = this.props;
        const { latitude, longitude } = this.state;

        ForecastAction.getCurrentForecast(latitude, longitude);

        ForecastAction.getFutureForecast(latitude, longitude);

        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000)
    }

    render() {
        const { CurrentForecastData, FutureForecastData } = this.props;
        return (
            <View style={styles.container}>
                <Loader isVisiable={CurrentForecastData.loading} />
                <ScrollView
                    horizontal={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getForecastData}
                        />
                    }
                    style={{ flex: 1 }} showsVerticalScrollIndicator>
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
                                <Text style={styles.numberText1}>Today</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.numberText1, fontSize: getFontSize(80) }}>
                                        {Math.round(parseFloat(CurrentForecastData.data.main.temp))}
                                    </Text>
                                    <Text style={{ paddingTop: dynamicSize(14), fontSize: getFontSize(20), color: 'white', fontWeight: '600' }}>0</Text>
                                    <Text style={{ ...styles.numberText1, fontSize: getFontSize(80) }}>C</Text>
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
                                                    {moment(item.day).format('dddd')}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.numberText2}>
                                                        {Math.round(parseFloat(item.dayTemp))}
                                                    </Text>
                                                    <Text style={{ ...styles.numberText2, fontSize: getFontSize(12) }}>0</Text>
                                                    <Text style={styles.numberText2}>C</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            ) : null}
                        </>
                    ) : null}
                </ScrollView>
            </View >
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
        fontSize: getFontSize(50),
        fontWeight: '400',
        color: '#fff'
    },
    errorButton: {
        width: dynamicSize(100),
        height: dynamicSize(45),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dynamicSize(50),
        borderRadius: 10,
        backgroundColor: '#ed2602'
    },
    buttonText: {
        fontSize: getFontSize(18),
        color: '#fff'
    },
    upperContainer: {
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText1: {
        fontSize: getFontSize(90),
        fontWeight: '400',
        color: '#fff'
    },
    numberText2: {
        fontSize: getFontSize(22),
        fontWeight: '400',
        color: '#000'
    },
    text1: {
        fontWeight: '400',
        fontSize: getFontSize(40),
        color: '#fff'
    },
    text2: {
        fontSize: getFontSize(22),
        fontWeight: '400',
        color: '#000'
    },
    buttomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 50,
        height: dynamicSize(45),
        marginLeft: dynamicSize(25),
        paddingHorizontal: dynamicSize(20),
        alignItems: 'center',
        paddingRight: dynamicSize(20),
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: dynamicSize(5)
    },
    buttomContainer: {
        height: height / 2,
        marginTop: dynamicSize(15)
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
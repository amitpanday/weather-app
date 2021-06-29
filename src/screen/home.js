import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Loader from '../component/loader';

const { width, height } = Dimensions.get('screen');



class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
                    {/* <Loader visiable={true} /> */}
                    {/* <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{`Something Went \nWrong at our \nEnd`}</Text>
                        <TouchableOpacity onPress={() => { console.log('retry click') }} style={styles.errorButton}>
                            <Text style={styles.buttonText}>RETRY</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.upperContainer}>
                        <Text style={styles.numberText1}>10</Text>
                        <Text style={styles.text1}>Delhi</Text>
                    </View>
                    <View style={styles.buttomContainer}>
                        {[{}, {}, {}, {}, {}].map((item, index) => {
                            return (
                                <View style={styles.buttomRow}>
                                    <Text style={styles.text2}>Monday</Text>
                                    <Text style={styles.numberText2}>8</Text>
                                </View>
                            )
                        })}
                    </View>
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
        fontSize: 112,
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

export default Home;
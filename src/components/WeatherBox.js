import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

export default class WeatherBox extends Component{
    render(){
        return(
            <View>
                <Image
                    source={require('./WeatherBox.png')}
                    style={styles.weatherBox} />

                <Image
                    style={styles.weatherIcon}
                    source={{uri:`http://openweathermap.org/img/wn/${this.props.weatherIcon}@2x.png`}}
                />

                <Text style={styles.temperatureText}>
                    {this.props.temperature}
                </Text>
                <Text style={styles.weatherText}>
                    {this.props.weather}
                </Text>
                <Text style={styles.locationText}>
                    {this.props.location}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    weatherBox:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    temperatureText:{
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
        right: 30,
    },
    weatherText:{
        position: 'absolute',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        right: 30,
    },
    locationText:{
        position: 'absolute',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 80,
        right: 30,
    },
    weatherIcon:{
        position: 'absolute',
        marginTop: 20,
        width: 170,
        height: 90,
    }
})
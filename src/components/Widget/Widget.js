import React, { useState, useEffect } from 'react';
import { API_KEY } from '../../services/keys';
import { useDataLayerValue } from '../../DataLayerContext';
import { motion } from 'framer-motion';
import './Widget.css';

/* API URL */
let weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?';

function Widget() {

    /* Data Layer Context - Used to read and add data */
    const [{ title, temperature, wind }, dispatch] = useDataLayerValue();

    /* State */
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState(null);
    const [geolocationError, setGeolocationError] = useState(null);

    useEffect(() => {

        /* Geolocation - Get users current position */
        /* Retrieve Latitude and Longitude and send it to DataLayerContext */
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getGeolocation, handleLocationError);
        }

        /* Fetch data from API using params */
        fetchWeatherAPI();

    }, [latitude, longitude, temperature])

    /* Set the Latitude and Longitude states */
    const getGeolocation = (position) => {

        /* Latitude */
        setLatitude(position.coords.latitude);

        /* Longitude */
        setLongitude(position.coords.longitude);
    }

    /* Populate geolocationError message */
    const handleLocationError = (err) => {
        setGeolocationError(err.message);
    }

    /* Fetch Weather data from API */
    const fetchWeatherAPI = () => {

        fetch(`${weatherAPI}lat=${latitude}&lon=${longitude}&units=${temperature}&appid=${API_KEY}`)
            .then(res => res.json())
            .then((result) => {

                /* Populate Weather Data */
                setWeather(result);
            })
            .catch(err => {
                console.error(err);
            })
    }

    /* Render */
    /* Using Famer Motion for animation and effects */
    return (
        <motion.div className="widget"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .2 }}
            whileTap={{ scale: 0.9 }}>

            {/* Widget top area - Displays Title */}
            <motion.div className="widget__top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}>
                <h3>{title}</h3>
            </motion.div>

            {/* Bottom area - Displays icon on the left side and weather info on the right side */}
            <div className={geolocationError ? 'widget__bottom geolocation__error' : 'widget__bottom'}>

                {/* Icon */}
                <motion.div className="widget__icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}>
                    {weather?.weather[0].icon ? <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Icon" /> : ''}
                </motion.div>

                {/* Weather info */}
                <motion.div className="widget__info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5 }}>
                    <div className="widget__info__details">
                        <p>{weather ? weather?.name : 'Loading'}</p>
                        <h3>{weather?.main ? parseInt(weather?.main?.temp) : ''}&#186;</h3>
                        <div className={wind === 'on' ? 'widget__wind' : 'widget__wind off'}>
                            <span>Wind</span>
                            <span>{weather?.wind?.speed ? parseInt(weather?.wind?.speed) : ''} {temperature === 'metric' ? 'km/h' : 'mph'}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Geolocation error */}
            <motion.div className={geolocationError ? 'widget__info__error geolocation__error' : 'widget__info__error'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}>
                {geolocationError}
            </motion.div>
        </motion.div>
    )
}

export default Widget;
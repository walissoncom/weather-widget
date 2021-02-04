import React, { useState, useEffect } from 'react';
import { API_KEY } from '../../services/keys';
import { useDataLayerValue } from '../../DataLayerContext';
import { motion } from 'framer-motion';
import './Widget.css';

/* API URL */
let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';

function Widget() {

    /* Data Layer Context - Used to read and add data */
    const [{ darkMode, title, temperature, wind }, dispatch] = useDataLayerValue();

    /* State */
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState(null);
    const [geolocationError, setGeolocationError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);

    useEffect(() => {

        /* Check if API Key is avaible for fetching data */
        if (API_KEY) {

            /* Geolocation - Get users current position */
            /* Retrieve Latitude and Longitude and send it to DataLayerContext */
            if (navigator.geolocation && !isLocationLoaded)
                navigator.geolocation.getCurrentPosition(getGeolocation, handleLocationError);

            /* Fetch data from API using params */
            if (isLocationLoaded)
                fetchWeatherAPI();
        }

        /* Used to define if user is on mobile or desktop */
        /* OpenWeatherAPI image when retrieved does not display in mobile devices, this will then display the local images for weather */
        if (window.screen.width <= 768)
            setIsMobile(true);
        else
            setIsMobile(false);

    }, [latitude, longitude, temperature, isLocationLoaded])

    /* Set the Latitude and Longitude states */
    const getGeolocation = (position) => {

        /* Latitude */
        setLatitude(position.coords.latitude);

        /* Longitude */
        setLongitude(position.coords.longitude);

        /* Set Location Loaded */
        setIsLocationLoaded(true);
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
            <div className={geolocationError || !API_KEY ? 'widget__bottom geolocation__error' : 'widget__bottom'}>

                {/* Icon */}
                <motion.div className="widget__icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}>

                    {/* Check if the icon code is retrieved from API. Then check if user has selected dark mode or not. */}
                    {/* If user has not selected any mode option, by default it loads the icons coming from the API provider */}
                    {/* If the user has selected dark mode, it loads local svg files with animation */}
                    {/* If mobile device, display local icons */}
                    {
                        weather?.weather[0].icon ? (

                            !darkMode && !isMobile ? (
                                <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Icon" />
                            ) : (
                                <img className="animated__icon" src={require(`../../assets/icons/${weather?.weather[0].icon}.svg`).default} alt="Icon" />
                            )
                        ) : (
                            ''
                        )

                    }
                </motion.div>

                {/* Weather info */}
                <motion.div className="widget__info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5 }}>

                    <div className="widget__info__details">
                        <p>{weather?.name}</p>
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

            {/* API Key error */}
            <motion.div className={API_KEY ? 'widget__info__error' : 'widget__info__error api__key__error'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}>
                <p>API Key not provided.</p>
                <br />
                <p>Check the Set Up & Installation Instructions content</p>
            </motion.div>

        </motion.div>
    )
}

export default Widget;
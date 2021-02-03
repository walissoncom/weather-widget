import React, { useState, useEffect } from 'react';
import { API_KEY } from '../../services/keys';
import { useDataLayerValue } from '../../DataLayerContext';
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

    return (
        <div className="widget">

            {/* Widget top area - Displays Title */}
            <div className="widget__top">
                <h3>{title}</h3>
            </div>

            {/* Bottom area - Displays icon on the left side and weather info on the right side */}
            <div className={geolocationError ? 'widget__bottom geolocation__error' : 'widget__bottom'}>

                {/* Icon */}
                <div className="widget__icon">
                    {weather?.weather[0].icon ? <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Icon" /> : ''}
                </div>

                {/* Weather info */}
                <div className="widget__info">
                    <div class="widget__info__details">
                        <p>{weather ? weather?.name : 'Loading'}</p>
                        <h3>{weather?.main ? parseInt(weather?.main?.temp) : ''}&#186;</h3>
                        <div className={wind === 'on' ? 'widget__wind' : 'widget__wind off'}>
                            <span>Wind</span>
                            <span>{weather?.wind?.speed ? parseInt(weather?.wind?.speed) : ''} {temperature === 'metric' ? 'km/h' : 'mph'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Geolocation error */}
            <div className={geolocationError ? 'widget__info__error geolocation__error' : 'widget__info__error'}>
                {geolocationError}
            </div>
        </div>
    )
}

export default Widget;
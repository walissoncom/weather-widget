import React, { useEffect } from 'react';
import Form from './components/Form/Form';
import Widget from './components/Widget/Widget';
import { useDataLayerValue } from './DataLayerContext';
import { actionTypes } from './reducer';
import './App.css';

/* Main Component */
function App() {

  /* Populate DataLayerContext */
  const [{ }, dispatch] = useDataLayerValue();

  useEffect(() => {

    /* Geolocation - Get users Latitude and Longitude and send it to DataLayerContext */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        /* Latitude */
        dispatch({
          type: actionTypes.SET_LATITUDE,
          latitude: position.coords.latitude
        })

        /* Longitude */
        dispatch({
          type: actionTypes.SET_LONGITUDE,
          longitude: position.coords.longitude
        })
      })
    }

  }, [])

  return (
    <div className="app">

      {/* Editor - Form component */}
      <div className="editor">
        <Form />
      </div>

      {/* Separator */}
      <div className="line"></div>

      {/* Visual - Widget component */}
      <div className="visual">
        <Widget />
      </div>
    </div>
  );
}

export default App;

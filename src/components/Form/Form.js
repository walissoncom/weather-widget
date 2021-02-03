import React from 'react';
import { useDataLayerValue } from '../../DataLayerContext';
import { actionTypes } from '../../reducer';
import './Form.css';

function Form() {

    /* Data Layer Context - Used to read and add data */
    const [{ title, temperature, wind }, dispatch] = useDataLayerValue();

    /* Form Events */
    const handleTitleInputChange = (e) => {
        let title = e.currentTarget.value;
        dispatch({ type: actionTypes.SET_TITLE, title });
    }

    const handleTemperatureChange = (e) => {
        let temperature = e.currentTarget.value;
        dispatch({ type: actionTypes.SET_TEMPERATURE, temperature });
    }

    const handleWindChange = (e) => {
        let wind = e.currentTarget.value;
        dispatch({ type: actionTypes.SET_WIND, wind });
    }

    /* Render */
    return (
        <div className="form">

            {/* Editor Form */}
            <form>

                {/* Title */}
                <div className="form__title">
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={handleTitleInputChange} />
                </div>

                {/* Temperature */}
                <div className="form__temperature">

                    <label>Temperature</label>
                    <div className="form__radio">

                        <div>
                            <input
                                type="radio"
                                id="metric"
                                value="metric"
                                checked={temperature === 'metric' ? true : false}
                                onChange={handleTemperatureChange} />
                            <label><span>&#186;</span>C</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="imperial"
                                value="imperial"
                                checked={temperature === 'imperial' ? true : false}
                                onChange={handleTemperatureChange} />
                            <label><span>&#186;</span>F</label>
                        </div>

                    </div>
                </div>

                {/* Wind */}
                <div className="form__wind">

                    <label>Wind</label>
                    <div className="form__radio">

                        <div>
                            <input
                                type="radio"
                                id="on"
                                value="on"
                                checked={wind === 'on' ? true : false}
                                onChange={handleWindChange} />
                            <label>On</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="off"
                                value="off"
                                checked={wind === 'off' ? true : false}
                                onChange={handleWindChange} />
                            <label>Off</label>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;
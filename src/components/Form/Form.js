import React from 'react';
import { useDataLayerValue } from '../../DataLayerContext';
import { actionTypes } from '../../reducer';
import { motion } from 'framer-motion';
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

    /* Avoids reloading the page when user clicks on enter key on input field */
    const formSubmit = (e) => {
        e.preventDefault();
    }

    /* Render */
    /* Using Famer Motion for animation and effects */
    return (
        <div className="form" onSubmit={formSubmit}>

            {/* Editor Form */}
            <form>

                {/* Title */}
                <motion.div className="form__title"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: .25 }}>
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={handleTitleInputChange} />
                </motion.div>

                {/* Temperature */}
                <motion.div className="form__temperature"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: .5 }}>

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
                </motion.div>

                {/* Wind */}
                <motion.div className="form__wind"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: .75 }}>

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
                </motion.div>
            </form>
        </div>
    )
}

export default Form;
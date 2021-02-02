import React from 'react';
import './Form.css';

function Form() {
    return (
        <div className="form">

            {/* Editor Form */}
            <form>

                {/* Title */}
                <div className="form__title">
                    <label>Title</label>
                    <input type="text" name="title" />
                </div>

                {/* Temperature */}
                <div className="form__temperature">
                    <label>Temperature</label>
                    <div class="form__radio">
                        <div>
                            <input type="radio" id="celsius" name="celsius" value="celsius" />
                            <label for="celsius"><span>&#186;</span>C</label>
                        </div>
                        <div>
                            <input type="radio" id="fahrenheit" name="fahrenheit" value="fahrenheit" />
                            <label for="fahrenheit"><span>&#186;</span>F</label>
                        </div>
                    </div>
                </div>

                {/* Wind */}
                <div className="form__wind">
                    <label>Wind</label>
                    <div class="form__radio">
                        <div>
                            <input type="radio" id="celsius" name="celsius" value="celsius" />
                            <label for="celsius"><span>&#186;</span>C</label>
                        </div>
                        <div>
                            <input type="radio" id="fahrenheit" name="fahrenheit" value="fahrenheit" />
                            <label for="fahrenheit"><span>&#186;</span>F</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;
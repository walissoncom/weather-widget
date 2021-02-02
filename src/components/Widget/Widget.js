import React from 'react';
import './Widget.css';
import icon from '../../assets/images/icon.png';

function Widget() {
    return (
        <div className="widget">

            {/* Widget top area - Displays Title */}
            <div className="widget__top">
                <h3>Title of Widget</h3>
            </div>

            {/* Bottom area - Displays icon on the left side and weather info on the right side */}
            <div className="widget__bottom">

                {/* Icon */}
                <div className="widget__icon">
                    <img src={icon} alt="Icon" />
                </div>

                {/* Weather info */}
                <div className="widget__info">
                    <div class="widget__info__left">
                        <p>Sydney</p>
                        <h3>26&#186;</h3>
                        <div className="widget__wind">
                            <span>Wind</span>
                            <span>NE 24km/h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widget;
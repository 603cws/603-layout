import React from 'react';
import './InteractiveInputSlider.css';

const InteractiveInputSlider = ({ name, value, onChange, min2, max2, step2 }) => {
    const min = min2;
    const max = max2;
    const step = step2;

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + step);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - step);
        }
    };

    const handleInputChange = (event) => {
        const newValue = Number(event.target.value);
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className="interactive-slider-container">
            <label htmlFor="md-cabin-size">{name}: </label>

            <button onClick={handleDecrement} className="slider-button">-</button>
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleInputChange}
                className="slider-input"
            />
            <button onClick={handleIncrement} className="slider-button">+</button>
            {/* <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${((value - min) / (max - min)) * 100}%` }}></div>
            </div> */}
        </div>
    );
};

export default InteractiveInputSlider;

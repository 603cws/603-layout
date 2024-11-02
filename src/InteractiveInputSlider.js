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
            <div className='interactive-slider-name'>
            <label htmlFor={`${name}-input`}>{name}: </label>
            </div>
            <div className='interactive-slider-counter'>
            <button
                onClick={handleDecrement}
                className="slider-button"
                aria-label={`Decrease ${name}`}
            >
                -
            </button>
            <input
                id={`${name}-input`}
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleInputChange}
                className="slider-input"
                aria-label={`${name} value`}
            />
            <button
                onClick={handleIncrement}
                className="slider-button"
                aria-label={`Increase ${name}`}
            >
                +
            </button>
            </div>
            
        </div>
    );
};

export default InteractiveInputSlider;

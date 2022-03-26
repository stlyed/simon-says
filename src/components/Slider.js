import React from "react";
import styled from "styled-components";

const SliderStyles = styled.div`
    input {
        width: 100%;
        appearance: none;
        height: 13px;
        border-radius: 6px;
        background: honeydew;
        outline: none;
        padding: 0;
        margin: 0;
        &::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #7a00ff;
            cursor: pointer;
        }
    }
`;

const Slider = ({ className, max, min = 0, value, onChange, index }) => {
    return (
        <SliderStyles>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                className={className}
                onChange={onChange}
                data-index={index}
            />
        </SliderStyles>
    );
};

export default Slider;

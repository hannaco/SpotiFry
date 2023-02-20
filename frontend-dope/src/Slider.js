import ReactSlider from "react-slider";
import { useState } from "react";
import './Slider.css'

const Slider = () => {
    const [currentValue, setCurrentValue] = useState(0);
    return (
        <ReactSlider
            className="customSlider"
            trackClassName="customSlider-track"
            thumbClassName="customSlider-thumb"
            markClassName="customSlider-mark"
            marks
            step={1}
            min={0}
            max={10}
            defaultValue={0}
            value={currentValue}
            onChange={(value) => setCurrentValue(value)}

            renderMark={(props) => {
                if (props.key < currentValue) {
                    props.className = "customSlider-mark customSlider-mark-before";
                } else if (props.key === currentValue) {
                    props.className = "customSlider-mark customSlider-mark-active";
                }
                return <span {...props} />;
            }}
        />
    );
};

export default Slider;
// TourLocation.tsx
import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function TourLocation(props: any) {
    const [showFullText, setShowFullText] = useState(false);

    return (
        <div className="tour-location">
            <h2>{props.name}</h2>
            <img src={props.image} alt="Tour Location"/>
            <ReactAudioPlayer src={props.audio} controls />
            <p>{showFullText ? props.text : props.abridgedText}</p>
            <button onClick={() => setShowFullText(!showFullText)}>
                {showFullText ? 'Show Less' : 'Show More'}
            </button>
        </div>
    );
}

export default TourLocation;
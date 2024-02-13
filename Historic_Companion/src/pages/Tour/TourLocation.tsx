import React from 'react';
import ReactAudioPlayer from 'react-audio-player';


function TourLocation(props: any) {

    return (
        <div className="tour-location">
            <h2>{props.name}</h2>
            <img src={props.image} alt="Tour Location"/>
            <ReactAudioPlayer src={props.audio} controls />
            <p>{props.abridgedText}</p>
            <button>More Details</button>
        </div>
    );
}
export default TourLocation;
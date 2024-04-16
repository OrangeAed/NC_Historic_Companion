// AudioComponent.tsx
import React from 'react';

type AudioComponentProps = {
    content: string;
};

const AudioComponent: React.FC<AudioComponentProps> = ({ content }) => {
    return (
        <audio controls>
            <source src={content} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioComponent;
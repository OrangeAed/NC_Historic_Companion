// ImageComponent.tsx
import React from 'react';

type ImageComponentProps = {
    content: string;
};

const ImageComponent: React.FC<ImageComponentProps> = ({ content }) => {
    return <img src={content} alt="content" />;
};

export default ImageComponent;
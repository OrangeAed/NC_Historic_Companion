// src/components/LocationComponents/ImageComponent/ImageComponent.tsx
import React from 'react';
import { ComponentData } from '../../../types.ts'

interface ImageComponentProps {
    data: ComponentData;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ data }) => {
    return (
        <div>
            <img src={data.content} alt={data.caption} />
            {data.caption && <p>{data.caption}</p>}
        </div>
    );
};

export default ImageComponent;
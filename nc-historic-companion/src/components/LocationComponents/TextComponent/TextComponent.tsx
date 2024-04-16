// TextComponent.tsx
import React from 'react';

type TextComponentProps = {
    content: string;
};

const TextComponent: React.FC<TextComponentProps> = ({ content }) => {
    return <p>{content}</p>;
};

export default TextComponent;
import React, { ReactNode } from 'react';

type VisitorLayoutProps = {
    children: ReactNode;
};

function VisitorLayout({ children }: VisitorLayoutProps) {
    return (
        <div>
            <header>
                {children}
            </header>
        </div>
    );
}

export default VisitorLayout;
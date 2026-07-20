import React, { ReactNode } from "react";

interface SkeletonContainerProps {
    numberOfElements?: number;
    children?: ReactNode;
}

const SkeletonContainer = ({
    numberOfElements = 1,
    children,
}: SkeletonContainerProps) => {

    const elementsNumber = numberOfElements <= 0 ? 1 : numberOfElements;

    const elements = Array.from({ length: elementsNumber }, (_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
    ));

    return (<>{elements}</>);
};

export default SkeletonContainer;
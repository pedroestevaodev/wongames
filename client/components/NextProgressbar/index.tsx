'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextProgressbar = () => {
    return (
        <ProgressBar
            height="5px"
            color="#F231A5"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
};

export default NextProgressbar;
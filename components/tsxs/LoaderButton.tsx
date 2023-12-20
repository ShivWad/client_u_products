'use client'

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

/**
 * 
 * @param handleClick: () => Promise<void>, 
 * @param displayText: string
 * @param classNames?: string 
 * @returns 
 */
const LoaderButton = ({ handleClick, displayText, classNames }: { handleClick: () => Promise<void>, displayText: string, classNames?: string }) => {
    const [processing, setProcessing] = useState(false);

    return (
        <button className={`global-button ${processing ? 'processing' : ""} ${classNames}`} onClick={async () => {
            setProcessing(true);
            await handleClick();
            setProcessing(false);
        }} >
            {processing ? <FontAwesomeIcon className='spinner' icon={faSpinner} /> : displayText}
        </button>
    )
}

export default LoaderButton
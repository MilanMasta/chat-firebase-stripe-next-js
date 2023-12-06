import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-outline-indigo-200" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none">
                    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502" />
                    <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4" />
                </circle>
            </svg>
        </div>
    ); 
};

export default LoadingSpinner;
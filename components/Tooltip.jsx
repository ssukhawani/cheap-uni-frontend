import React, { useState } from "react";
export function ToolTip({children,tooltipText}) {
    const [tooltipStatus, setTooltipStatus] = useState(true);
    return (
        <>
            <div className="flex-col md:flex-row flex items-center md:justify-center">
                {/*Code Block for gray tooltip starts*/}
                <div className="relative" onMouseEnter={() => setTooltipStatus(true)} onMouseLeave={() => setTooltipStatus(false)}>
                    {tooltipStatus && (
                        <div role="tooltip" className="z-20 transition duration-150 ease-in-out right-4 bottom-4 mb-8 absolute shadow-lg pt-4 pr-2 pl-3 pb-5 bg-gray-800 text-gray-600 rounded w-52">
                            <svg className="absolute bottom-0 right-4 -mb-2" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="Tooltips-" transform="translate(-84.000000, -203.000000)" fill="#2D3748">
                                        <g id="Group-3-Copy" transform="translate(76.000000, 145.000000)">
                                            <polygon className="shadow" id="Triangle" transform="translate(16.000000, 62.000000) rotate(-180.000000) translate(-16.000000, -62.000000) " points="16 58 24 66 8 66" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p className="text-xs text-white leading-4 w-full text-center">{tooltipText}</p>
                        </div>
                    )}
                    <div className="cursor-pointer">
                        {children}
                    </div>
                </div>
                {/*Code Block for gray tooltip ends*/}
            </div>
        </>
    );
}

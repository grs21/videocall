import React from "react"

const Svg = ({ children, className, width, height, viewBox, xmls }) => {

    return (
        <svg viewBox={`${viewBox}`} className={`${className}`} width={`${width}`} height={`${height}`} xmls={`${xmls}`}>
            {children}
        </svg >
    );
};
export const Croos = () => {
    return (
        <Svg className="croos" width={"48"} height={"48"} viewBox={"0 0 48 48"} xmls={"http://www.w3.org/2000/svg"}>
            <path opacity="0.3" d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="black" />
            <path d="M32 16L16 32M16 16L32 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

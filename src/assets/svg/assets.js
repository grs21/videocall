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

export const Call = () => {
    return (
        <Svg className="croos" width={"25"} height={"25"} viewBox={"0 0 512 512"} xmls={"http://www.w3.org/2000/svg"}>
            <path opacity="0.9" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" fill="white" />
            <path d="M32 16L16 32M16 16L32 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

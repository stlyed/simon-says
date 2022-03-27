import React from "react";

const Text = ({ children, className, innerRef }) => {
    return <h3 className={className} ref={innerRef}>{children}</h3>;
};

export default Text;

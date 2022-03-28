import { FC } from "react";

interface text {
    className?: string;
}

const Text: FC<text> = ({ children, className }) => {
    return <h3 className={className}>{children}</h3>;
};

export default Text;

import { FaQuoteLeft } from "react-icons/fa6";

const SectionHeader = ({ heading, subHeading }) => {
    return (
        <div className="text-center my-10">
            <h1 className="text-3xl font-bold mb-5">{heading}</h1>
            <p>{subHeading}</p>
        </div>
    );
};

export default SectionHeader;
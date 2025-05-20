

const SectionHeader = ({ heading, subHeading }) => {
    return (
        <div className="text-center my-5">
            <h1 className="text-3xl font-bold mb-5 inline-block border-b-2 border-black pb-2">{heading}</h1>
            <p>{subHeading}</p>
        </div>
    );
};

export default SectionHeader;
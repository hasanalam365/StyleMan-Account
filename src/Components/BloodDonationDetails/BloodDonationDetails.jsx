import { useLoaderData } from "react-router-dom";

const BloodDonationDetails = () => {

    const loadBloodData = useLoaderData()

    console.log(loadBloodData)

    return (
        <div>
            <h1>{loadBloodData._id}</h1>
        </div>
    );
};

export default BloodDonationDetails;
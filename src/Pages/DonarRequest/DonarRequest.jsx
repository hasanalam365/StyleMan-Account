import useDataLoad from "../../Hooks/useDataLoad";

const DonarRequest = () => {

    const [donationRequests] = useDataLoad()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                donationRequests.filter(item => item.status === 'pending').map(donar => <div key={donar._id} className="card bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <h2 className="card-title">Recipient Name: {donar.recipientName}</h2>
                        <p>Upazila: {donar.upazila}</p>
                        <p>District: {donar.district}</p>
                        <p>Donation Time: {donar.donateTime}</p>
                        <p>Donation Date: {donar.donateDate}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default DonarRequest;
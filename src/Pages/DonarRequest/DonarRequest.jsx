import { Link } from "react-router-dom";
import useDataLoad from "../../Hooks/useDataLoad";
import { DNA } from "react-loader-spinner";

const DonarRequest = () => {

    const [donationRequests] = useDataLoad()

    return (<>
        {donationRequests.length === 0 && <div className="mt-40 ml-40 md:mt-48 md:ml-[350px] lg:mt-52 lg:ml-[500px]">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 mt-5">
            {
                donationRequests.filter(item => item.status === 'pending').map(donar => <div key={donar._id} className="card bg-base-100 shadow-xl ">
                    <div className="card-body">
                        <h2 className="card-title">Recipient Name: {donar.recipientName}</h2>
                        <p>Upazila: {donar.upazila}</p>
                        <p>District: {donar.district}</p>
                        <p>Donation Time: {donar.donateTime}</p>
                        <p>Donation Date: {donar.donateDate}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/donarRequestDetails/${donar._id}`}>
                                <button className="btn btn-primary">View Details</button>
                            </Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    </>
    );
};

export default DonarRequest;
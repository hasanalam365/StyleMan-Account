import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe('')

const Fundings = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Fundings</title>

            </Helmet>
            <div>
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    );
};

export default Fundings;
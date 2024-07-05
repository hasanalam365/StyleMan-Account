import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {

    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [select, setSelect] = useState(1);
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();


    const createPaymentIntent = async () => {
        try {
            const response = await axiosPublic.post('http://localhost:5000/create-payment-intent', { amount });
            setClientSecret(response.data.clientSecret);
        } catch (err) {
            console.error("Error creating payment intent:", err);
        }
    };

    useEffect(() => {
        if (clientSecret) {
            confirmPayment();
        }
    }, [clientSecret]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            createPaymentIntent();
        }
    };

    const confirmPayment = async () => {
        if (!clientSecret) {
            return;
        }

        const card = elements.getElement(CardElement);
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        });

        if (cardConfirmError) {
            console.log('confirm error:', cardConfirmError);
        } else {
            const transID = paymentIntent.id;
            // setTransactionId(id);

            Swal.fire({
                title: `Thanks <span style="color: #008000;">${user.displayName}</span> for your funding`,
                html: `TransId <span style="color: #FFA500;">: ${transID}</span>`,
                icon: "success"
            });


        }
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };


    return (
        <div className="mt-10 w-full md:w-1/2 lg:1/2 mx-auto p-4 bg-gray-100 mb-5 text-center">
            <div>
                <div className="flex justify-center   font-medium">
                    <button onClick={() => setSelect(1)} className={`${select === 1 ? 'bg-green-600 text-white' : ''} border-2 p-2`}>GIVE ONCE</button>

                    <button onClick={() => setSelect(2)} className={`${select === 2 ? 'bg-green-600 text-white' : ''} border-2 p-2`}>MONTHLY</button>
                </div>
                <div className="mt-5">
                    <input onChange={handleAmount} type="text" placeholder="amount" className="p-2 bg-gray-200 rounded-lg " />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 ">
                <div className="w-full md:w-3/4 lg:w-3/4 mx-auto">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',

                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button className="btn btn-sm btn-primary mt-5" type="submit" disabled={!stripe}>
                    Payment
                </button>
            </form>
            <p className="text-red-600">{error}</p>


        </div>
    );
};

export default CheckOutForm;
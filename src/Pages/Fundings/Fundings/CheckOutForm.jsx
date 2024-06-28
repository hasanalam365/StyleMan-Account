import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckOutForm = () => {

    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //step-1
        if (!stripe || !elements) {
            return
        }

        //step-2
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        //step-3:
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        //step-3:
        if (error) {
            console.log('payment error:', error)
            setError(error.message)
        }
        else {
            console.log('payment method:', paymentMethod)
            setError('')
        }


    }

    return (
        <div className="mt-10">

            <form onSubmit={handleSubmit}>
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
                <button className="btn btn-sm btn-primary mt-5" type="submit" disabled={!stripe}>
                    Payment
                </button>
            </form>
            <p className="text-red-600">{error}</p>
        </div>
    );
};

export default CheckOutForm;